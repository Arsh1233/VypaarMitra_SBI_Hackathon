import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { theme } from '../components/theme';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

const TABS = [{ id: 'pan', label: 'PAN Card', icon: '📛' }, { id: 'gst', label: 'GST Details', icon: '🧾' }, { id: 'aadhar', label: 'Aadhar Card', icon: '👆' }];

export const DocumentUploadScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [uploadState, setUploadState] = useState<'idle' | 'verifying' | 'success' | 'failed'>('idle');
  const [attempts, setAttempts] = useState(0);

  const simulateUpload = () => {
    setUploadState('verifying');
    setTimeout(() => {
      if (attempts < 2) {
        setUploadState('failed');
        setAttempts(prev => prev + 1);
      } else {
        setUploadState('success');
      }
    }, 1500);
  };

  const handleProceed = () => {
    navigation.navigate('VerificationProgress');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Vyapaar Mitra</Text>
        <View style={{width: 40}} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{paddingBottom: 40}}>
        <View style={styles.stepperContainer}>
          <View style={styles.stepperTop}>
            <View>
              <Text style={styles.stepperTitle}>Document Verification</Text>
              <Text style={styles.stepperSub}>Step 2 of 4: Business Identity</Text>
            </View>
            <View style={styles.kycBadge}>
              <Text style={styles.kycBadgeText}>KYC LEVEL 1</Text>
            </View>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '50%' }]} />
          </View>
        </View>

        <View style={styles.tabContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {TABS.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <TouchableOpacity 
                  key={tab.id} 
                  style={[styles.tab, isActive && styles.activeTab]}
                  onPress={() => {
                    setActiveTab(tab.id);
                    setUploadState('idle');
                    setAttempts(0);
                  }}
                >
                  <Text style={styles.tabIcon}>{tab.icon}</Text>
                  <Text style={[styles.tabText, isActive && styles.activeTabText]}>{tab.label}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <Card style={styles.uploadCard} variant="outlined">
          <View style={styles.previewBox}>
            {uploadState === 'idle' || uploadState === 'failed' ? (
              <View style={styles.emptyState}>
                <View style={styles.iconPlaceholder}>
                  <Text style={{fontSize: 32}}>📸</Text>
                </View>
                <Text style={styles.previewTitle}>Capture {TABS.find(t => t.id === activeTab)?.label}</Text>
                <Text style={styles.previewSub}>Place document within frame. Ensure no glare.</Text>
              </View>
            ) : (
              <View style={styles.emptyState}>
                <Text style={{fontSize: 40}}>{uploadState === 'success' ? '✅' : '⏳'}</Text>
                <Text style={[styles.previewTitle, { color: uploadState === 'success' ? theme.colors.tertiary.container : theme.colors.primary.main }]}>
                  {uploadState === 'success' ? 'Verified Successfully' : 'Verifying...'}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.controls}>
            <Text style={styles.controlsTitle}>Upload Options</Text>
            <TouchableOpacity style={styles.optionBtn} onPress={simulateUpload} disabled={uploadState === 'verifying'}>
              <Text style={{fontSize: 20}}>📷</Text>
              <Text style={styles.optionText}>Use Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionBtn} onPress={simulateUpload} disabled={uploadState === 'verifying'}>
              <Text style={{fontSize: 20}}>🖼️</Text>
              <Text style={styles.optionText}>From Gallery</Text>
            </TouchableOpacity>

            <View style={styles.strikesContainer}>
              <View style={styles.strikesTop}>
                <Text style={styles.strikesLabel}>RETRY CHANCES</Text>
                <Text style={styles.strikesCount}>{3 - attempts} / 3 Left</Text>
              </View>
              <View style={styles.strikesBars}>
                {[0, 1, 2].map((i) => (
                  <View key={i} style={[styles.strikeBar, { backgroundColor: i < attempts ? theme.colors.neutral.outline_variant : theme.colors.primary.main }]} />
                ))}
              </View>
              <Text style={styles.strikesWarning}>Blurry photos will lead to rejection</Text>
            </View>
          </View>
        </Card>

        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Verification Tips</Text>
          <Text style={styles.tipsText}>• Good Lighting: Avoid shadows</Text>
          <Text style={styles.tipsText}>• Sharp Focus: Ensure text is readable</Text>
          <Text style={styles.tipsText}>• Within Frame: All 4 corners visible</Text>
        </View>

        <View style={styles.actionContainer}>
          <Button fullWidth variant="primary" disabled={uploadState !== 'success'} onPress={handleProceed}>
            PROCEED TO NEXT STEP
          </Button>
          <Text style={styles.termsText}>By proceeding, you agree to our Document Handling Policy</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.surface.main },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: theme.spacing.md, paddingTop: 50, backgroundColor: theme.colors.surface.containerLowest, borderBottomWidth: 1, borderBottomColor: theme.colors.neutral.outline_variant },
  backBtn: { padding: 4 },
  backText: { fontSize: 24, color: theme.colors.primary.main },
  title: { ...theme.typography.HeadingMD, color: theme.colors.primary.main },
  content: { flex: 1, padding: theme.spacing.md },
  stepperContainer: { marginBottom: theme.spacing.lg },
  stepperTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: theme.spacing.sm },
  stepperTitle: { ...theme.typography.HeadingSM, color: theme.colors.primary.main },
  stepperSub: { ...theme.typography.BodySM, color: theme.colors.neutral.text_secondary },
  kycBadge: { backgroundColor: theme.colors.primary.fixed, paddingHorizontal: 12, paddingVertical: 4, borderRadius: theme.radius.full },
  kycBadgeText: { ...theme.typography.LabelMD, color: theme.colors.primary.onContainer },
  progressBarBg: { height: 6, backgroundColor: theme.colors.surface.variant, borderRadius: 3, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: theme.colors.primary.main },
  tabContainer: { marginBottom: theme.spacing.lg, paddingBottom: theme.spacing.xs },
  tab: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 24, paddingVertical: 10, borderRadius: theme.radius.full, marginRight: theme.spacing.sm, backgroundColor: 'transparent' },
  activeTab: { backgroundColor: theme.colors.primary.container },
  tabIcon: { fontSize: 18 },
  tabText: { ...theme.typography.LabelMD, color: theme.colors.neutral.text_secondary },
  activeTabText: { color: theme.colors.secondary.onContainer },
  uploadCard: { padding: theme.spacing.md, marginBottom: theme.spacing.lg },
  previewBox: { aspectRatio: 3/2, borderRadius: theme.radius.md, borderWidth: 2, borderStyle: 'dashed', borderColor: theme.colors.neutral.outline_variant, backgroundColor: theme.colors.surface.containerLow, alignItems: 'center', justifyContent: 'center', marginBottom: theme.spacing.md },
  emptyState: { alignItems: 'center', padding: theme.spacing.lg },
  iconPlaceholder: { width: 64, height: 64, borderRadius: 32, backgroundColor: theme.colors.surface.containerHigh, alignItems: 'center', justifyContent: 'center', marginBottom: theme.spacing.sm },
  previewTitle: { ...theme.typography.BodyMD, fontWeight: 'bold', color: theme.colors.primary.main, marginBottom: 4 },
  previewSub: { ...theme.typography.LabelMD, color: theme.colors.neutral.text_secondary, textAlign: 'center' },
  controls: { },
  controlsTitle: { ...theme.typography.HeadingSM, color: theme.colors.neutral.text_primary, marginBottom: theme.spacing.sm },
  optionBtn: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: theme.spacing.md, borderRadius: theme.radius.md, borderWidth: 1, borderColor: theme.colors.neutral.outline_variant, marginBottom: theme.spacing.sm },
  optionText: { ...theme.typography.BodyMD, fontWeight: '500', color: theme.colors.neutral.text_primary },
  strikesContainer: { marginTop: theme.spacing.md, padding: theme.spacing.md, backgroundColor: theme.colors.surface.container, borderRadius: theme.radius.md, borderWidth: 1, borderColor: 'rgba(196, 198, 208, 0.3)' },
  strikesTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  strikesLabel: { ...theme.typography.LabelMD, color: theme.colors.neutral.text_secondary },
  strikesCount: { ...theme.typography.LabelMD, color: theme.colors.primary.main, fontWeight: 'bold' },
  strikesBars: { flexDirection: 'row', gap: 4, marginBottom: 8 },
  strikeBar: { height: 4, flex: 1, borderRadius: 2 },
  strikesWarning: { fontSize: 10, color: theme.colors.neutral.text_secondary, fontWeight: 'bold', textTransform: 'uppercase' },
  tipsCard: { backgroundColor: theme.colors.surface.containerLowest, borderWidth: 1, borderColor: theme.colors.neutral.outline_variant, borderRadius: theme.radius.lg, padding: theme.spacing.lg, marginBottom: theme.spacing.lg },
  tipsTitle: { ...theme.typography.HeadingSM, color: theme.colors.primary.main, marginBottom: theme.spacing.sm },
  tipsText: { ...theme.typography.BodySM, color: theme.colors.neutral.text_secondary, marginBottom: 4 },
  actionContainer: { paddingTop: theme.spacing.md },
  termsText: { ...theme.typography.LabelMD, color: theme.colors.neutral.text_secondary, textAlign: 'center', marginTop: theme.spacing.md }
});
