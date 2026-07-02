import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { theme } from '../components/theme';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useOnboardingStore } from '../store/useOnboardingStore';

export const ProductRecommendationScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { accountTier, updateCollectedData, collectedData } = useOnboardingStore();
  
  const [selectedProducts, setSelectedProducts] = useState<string[]>(['current_account']);

  const toggleProduct = (id: string) => {
    if (id === 'current_account') return;
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    updateCollectedData({ selectedProducts });
    navigation.navigate('AccountActive');
  };

  const PRODUCTS = [
    {
      id: 'current_account',
      icon: '&#127968;',
      title: 'SBI Current Account',
      desc: 'Zero balance, free NEFT/RTGS.',
      badge: 'Pre-approved',
      badgeColor: theme.colors.semantic.success,
      mandatory: true,
      disabled: false,
    },
    {
      id: 'overdraft',
      icon: '&#128184;',
      title: 'Overdraft Facility',
      desc: accountTier === 'limited'
        ? 'Locked. Complete verification to unlock.'
        : 'Rs.5 Lakh limit at 9.5% p.a. Based on your GST.',
      badge: accountTier === 'limited' ? 'Locked' : 'Eligible',
      badgeColor: accountTier === 'limited' ? theme.colors.neutral.text_secondary : theme.colors.primary.main,
      mandatory: false,
      disabled: accountTier === 'limited',
    },
    {
      id: 'trade_finance',
      icon: '&#128230;',
      title: 'Trade Finance',
      desc: collectedData.gst
        ? 'Import/Export financing. Apply later.'
        : 'GST required. Apply after registration.',
      badge: 'Apply Later',
      badgeColor: theme.colors.neutral.text_secondary,
      mandatory: false,
      disabled: !collectedData.gst,
    },
    {
      id: 'insurance',
      icon: '&#128737;',
      title: 'Business Insurance',
      desc: 'Protect your business against fire, theft, and liability.',
      badge: 'Optional',
      badgeColor: theme.colors.neutral.text_secondary,
      mandatory: false,
      disabled: false,
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recommended for You</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.scoreSection}>
          <View style={styles.gauge}>
            <Text style={styles.scoreText}>82</Text>
          </View>
          <Text style={styles.scoreTitle}>Your Financial Fitness Score: 82</Text>
          <Text style={styles.scoreDesc}>Based on your profile and documents.</Text>
        </View>

        <View style={styles.productList}>
          {PRODUCTS.map(product => {
            const isSelected = selectedProducts.includes(product.id);
            return (
              <TouchableOpacity
                key={product.id}
                onPress={() => toggleProduct(product.id)}
                disabled={product.disabled || product.mandatory}
                activeOpacity={0.8}
              >
                <Card
                  variant={isSelected ? 'elevated' : 'default'}
                  style={[
                    styles.productCard,
                    isSelected && styles.selectedCard,
                    product.disabled && styles.disabledCard
                  ]}
                >
                  <View style={styles.cardHeader}>
                    <View style={styles.productIconBox}>
                      <Text style={styles.productIconLetter}>{product.title[0]}</Text>
                    </View>
                    <View style={styles.cardHeaderRight}>
                      <View style={[styles.badge, { backgroundColor: product.badgeColor }]}>
                        <Text style={styles.badgeText}>{product.badge}</Text>
                      </View>
                      <View style={[styles.radio, isSelected && styles.radioSelected]}>
                        {isSelected && <View style={styles.radioInner} />}
                      </View>
                    </View>
                  </View>
                  <Text style={styles.productTitle}>{product.title}</Text>
                  <Text style={styles.productDesc}>{product.desc}</Text>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.limitText}>
          Total Credit Limit: Rs.{selectedProducts.includes('overdraft') ? '5,00,000' : '0'}
        </Text>
        <Button variant="danger" fullWidth onPress={handleContinue} disabled={selectedProducts.length === 0}>
          Continue
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.surface.main },
  header: { padding: theme.spacing.lg, paddingTop: 60, backgroundColor: '#FFF', ...theme.shadows.sm },
  title: { ...theme.typography.HeadingMD, color: theme.colors.primary.main },
  content: { flex: 1, padding: theme.spacing.lg },
  scoreSection: { alignItems: 'center', marginBottom: theme.spacing.xl },
  gauge: { width: 120, height: 120, borderRadius: 60, borderWidth: 8, borderColor: theme.colors.semantic.success, justifyContent: 'center', alignItems: 'center', marginBottom: theme.spacing.md },
  scoreText: { fontSize: 36, fontWeight: 'bold', color: theme.colors.neutral.text_primary },
  scoreTitle: { ...theme.typography.BodyLG, fontWeight: 'bold', color: theme.colors.neutral.text_primary, marginBottom: theme.spacing.xs },
  scoreDesc: { ...theme.typography.BodySM, color: theme.colors.neutral.text_secondary },
  productList: { gap: theme.spacing.md, paddingBottom: theme.spacing.xl },
  productCard: { borderWidth: 2, borderColor: 'transparent' },
  selectedCard: { borderColor: theme.colors.primary.main },
  disabledCard: { opacity: 0.6 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.sm },
  productIconBox: { width: 40, height: 40, borderRadius: 20, backgroundColor: theme.colors.primary.fixed, alignItems: 'center', justifyContent: 'center' },
  productIconLetter: { fontSize: 18, fontWeight: 'bold', color: theme.colors.primary.main },
  cardHeaderRight: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: theme.radius.full },
  badgeText: { fontSize: 11, color: '#FFF', fontWeight: 'bold' },
  radio: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: theme.colors.neutral.text_secondary, justifyContent: 'center', alignItems: 'center' },
  radioSelected: { borderColor: theme.colors.primary.main },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: theme.colors.primary.main },
  productTitle: { ...theme.typography.BodyLG, fontWeight: 'bold', color: theme.colors.neutral.text_primary, marginBottom: theme.spacing.xs },
  productDesc: { ...theme.typography.BodySM, color: theme.colors.neutral.text_secondary },
  footer: { padding: theme.spacing.lg, backgroundColor: '#FFF', ...theme.shadows.lg },
  limitText: { ...theme.typography.BodyMD, fontWeight: 'bold', color: theme.colors.primary.main, textAlign: 'center', marginBottom: theme.spacing.md }
});
