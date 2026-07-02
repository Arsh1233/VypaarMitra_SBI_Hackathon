import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Animated, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { theme } from '../components/theme';
import { useOnboardingStore } from '../store/useOnboardingStore';
import { ProgressIndicator } from '../components/ProgressIndicator';

const QUESTIONS = [
  "Namaste! Aapka business account khulwana hai?",
  "Aapka business ka naam kya hai?",
  "Aapka PAN card number kya hai?",
  "GST number hai? Agar nahi, toh 'Nahi' bolein.",
  "Udyam Registration number hai?",
  "Kya aap apni CIBIL report check karne ki anumati dete hain? (Yes/No)"
];

export const ConversationScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { messages, setMessage, stepIndex, setStepIndex, updateCollectedData } = useOnboardingStore();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const voicePulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isVoiceActive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(voicePulse, { toValue: 1.2, duration: 400, useNativeDriver: true }),
          Animated.timing(voicePulse, { toValue: 1.0, duration: 400, useNativeDriver: true })
        ])
      ).start();
    } else {
      voicePulse.stopAnimation();
      voicePulse.setValue(1);
    }
  }, [isVoiceActive]);

  useEffect(() => {
    if (messages.length === 0) {
      triggerAgentMessage(QUESTIONS[0]);
    }
  }, []);

  const triggerAgentMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessage({
        id: Math.random().toString(),
        sender: 'agent',
        text,
        timestamp: Date.now(),
      });
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage = inputText.trim();
    setInputText('');

    setMessage({
      id: Math.random().toString(),
      sender: 'user',
      text: userMessage,
      timestamp: Date.now(),
    });

    processUserResponse(userMessage, stepIndex);
  };

  const processUserResponse = (text: string, currentStep: number) => {
    let nextStep = currentStep + 1;

    switch (currentStep) {
      case 0:
        break;
      case 1:
        updateCollectedData({ businessName: text });
        break;
      case 2:
        updateCollectedData({ pan: text });
        break;
      case 3:
        updateCollectedData({ gst: text.toLowerCase() === 'nahi' ? null : text });
        break;
      case 4:
        break;
      case 5:
        updateCollectedData({ consentGiven: text.toLowerCase() === 'yes' });
        setTimeout(() => navigation.navigate('DocumentUpload'), 1000);
        return;
    }

    setStepIndex(nextStep);
    triggerAgentMessage(QUESTIONS[nextStep]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>&#8592;</Text>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Vyapaar Mitra</Text>
          <View style={styles.onlineDot} />
        </View>
      </View>

      <ProgressIndicator steps={6} currentStep={stepIndex + 1} />

      <ScrollView
        ref={scrollViewRef}
        style={styles.chatArea}
        contentContainerStyle={styles.chatContent}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map(msg => (
          <View key={msg.id} style={[
            styles.messageBubble,
            msg.sender === 'agent' ? styles.agentMessage : styles.userMessage
          ]}>
            {msg.sender === 'agent' && <View style={styles.avatar} />}
            <View style={[styles.messageCard, msg.sender === 'agent' ? styles.agentCard : styles.userCard]}>
              <Text style={[styles.messageText, msg.sender === 'user' && styles.userMessageText]}>{msg.text}</Text>
            </View>
          </View>
        ))}
        {isTyping && (
          <View style={[styles.messageBubble, styles.agentMessage]}>
            <View style={styles.avatar} />
            <View style={[styles.messageCard, styles.agentCard]}>
              <Text style={styles.messageText}>...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputArea}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your response..."
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity
          style={styles.voiceBtn}
          onPress={() => setIsVoiceActive(!isVoiceActive)}
        >
          <Animated.View style={[styles.voiceInner, { transform: [{ scale: voicePulse }], backgroundColor: isVoiceActive ? theme.colors.semantic.error : '#E5E7EB' }]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Text style={styles.sendText}>&#8593;</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface.main,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    paddingTop: 50,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backBtn: {
    padding: theme.spacing.sm,
  },
  backText: {
    fontSize: 24,
    color: theme.colors.primary.main,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 40,
  },
  title: {
    ...theme.typography.HeadingMD,
    color: theme.colors.primary.main,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.semantic.success,
    marginLeft: theme.spacing.sm,
  },
  chatArea: {
    flex: 1,
  },
  chatContent: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  messageBubble: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    maxWidth: '80%',
    marginBottom: theme.spacing.sm,
  },
  agentMessage: {
    alignSelf: 'flex-start',
  },
  userMessage: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary.main,
    marginRight: theme.spacing.sm,
  },
  messageCard: {
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
  },
  agentCard: {
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 0,
    ...theme.shadows.sm,
  },
  userCard: {
    backgroundColor: theme.colors.primary.main,
    borderBottomRightRadius: 0,
  },
  messageText: {
    ...theme.typography.BodyLG,
    color: theme.colors.neutral.text_primary,
  },
  userMessageText: {
    color: '#FFF',
  },
  inputArea: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    backgroundColor: '#FFF',
    alignItems: 'center',
    gap: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingBottom: 30,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: theme.radius.md,
    padding: theme.spacing.sm,
    ...theme.typography.BodyMD,
  },
  voiceBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  }
});
