import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { theme } from '../components/theme';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useOnboardingStore } from '../store/useOnboardingStore';

export const AccountActiveScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { accountTier } = useOnboardingStore();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>&#9776;</Text>
        <Text style={styles.headerTitle}>Vyapaar Mitra</Text>
        <Text style={styles.headerIcon}>&#127760;</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.successSection}>
          <View style={styles.successIconContainer}>
            <Text style={{ fontSize: 40, color: '#FFF' }}>&#10003;</Text>
          </View>
          <Text style={styles.title}>Congratulations, Ramesh!</Text>
          <Text style={styles.subtitle}>Your business account is now fully active and ready for transactions.</Text>
        </View>

        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Text style={{ fontSize: 14 }}>&#9989;</Text>
            <Text style={styles.badgeText}>{accountTier === 'limited' ? 'LIMITED TIER' : 'FULL ACCOUNT TIER'}</Text>
          </View>
        </View>

        <Card variant="elevated" style={styles.accountCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.label}>ACCOUNT HOLDER</Text>
            <Text style={styles.holderName}>Ramesh Kumar</Text>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailBox}>
              <Text style={styles.label}>ACCOUNT NUMBER</Text>
              <Text style={styles.monoText}>3829 4402 9912 00</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.label}>IFSC CODE</Text>
              <Text style={styles.monoText}>VPMT0004921</Text>
            </View>
          </View>

          <View style={styles.cardFooter}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Text style={{ fontSize: 12 }}>&#128205;</Text>
              <Text style={styles.branchText}>Main Branch, Industrial Hub</Text>
            </View>
            <Text style={styles.accountType}>SAVINGS ACCOUNT</Text>
          </View>
        </Card>

        <View style={styles.actionSection}>
          <Button variant="primary" fullWidth style={{ marginBottom: theme.spacing.sm }}>
            Download Welcome Kit
          </Button>
          <Button variant="danger" fullWidth style={{ marginBottom: theme.spacing.sm }} onPress={() => navigation.navigate('MainTabs')}>
            Explore YONO Business
          </Button>
          <Button variant="outline" fullWidth>
            Share Account Details
          </Button>
        </View>

        <View style={styles.trustBanner}>
          <Text style={{ fontSize: 24 }}>&#128737;</Text>
          <View style={{ flex: 1, paddingLeft: 12 }}>
            <Text style={styles.trustTitle}>SECURELY ACTIVATED</Text>
            <Text style={styles.trustDesc}>Your account is secured with multi-factor authentication and bank-grade encryption.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.surface.main },
  scroll: { flex: 1, padding: theme.spacing.md },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: theme.spacing.md, height: 64, paddingTop: 20, backgroundColor: theme.colors.surface.containerLowest, borderBottomWidth: 1, borderBottomColor: theme.colors.neutral.outline_variant },
  headerIcon: { fontSize: 20, color: theme.colors.primary.main },
  headerTitle: { ...theme.typography.HeadingMD, color: theme.colors.primary.main },
  successSection: { alignItems: 'center', marginTop: theme.spacing.xl, marginBottom: theme.spacing.lg },
  successIconContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: theme.colors.tertiary.container, alignItems: 'center', justifyContent: 'center', marginBottom: theme.spacing.md },
  title: { ...theme.typography.DisplayLG, color: theme.colors.primary.main, textAlign: 'center', marginBottom: 8 },
  subtitle: { ...theme.typography.BodyLG, color: theme.colors.neutral.text_secondary, textAlign: 'center' },
  badgeContainer: { alignItems: 'center', marginBottom: theme.spacing.lg },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: theme.colors.primary.fixed, paddingHorizontal: 16, paddingVertical: 6, borderRadius: theme.radius.full, borderWidth: 1, borderColor: theme.colors.primary.container },
  badgeText: { ...theme.typography.LabelMD, color: theme.colors.primary.onContainer },
  accountCard: { padding: theme.spacing.lg, marginBottom: theme.spacing.lg },
  cardHeader: { marginBottom: theme.spacing.md },
  label: { ...theme.typography.LabelMD, color: theme.colors.neutral.text_secondary, marginBottom: 4 },
  holderName: { ...theme.typography.HeadingSM, color: theme.colors.primary.main, textTransform: 'uppercase' },
  detailsRow: { flexDirection: 'row', gap: theme.spacing.md, marginBottom: theme.spacing.md },
  detailBox: { flex: 1, padding: theme.spacing.md, backgroundColor: theme.colors.surface.containerLow, borderRadius: theme.radius.md, borderWidth: 1, borderColor: theme.colors.neutral.outline_variant },
  monoText: { ...theme.typography.BodyMD, fontWeight: 'bold', color: theme.colors.neutral.text_primary, fontFamily: 'monospace' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: theme.spacing.sm, borderTopWidth: 1, borderTopColor: theme.colors.neutral.outline_variant },
  branchText: { ...theme.typography.BodySM, color: theme.colors.neutral.text_secondary },
  accountType: { ...theme.typography.LabelMD, color: theme.colors.primary.main, fontWeight: 'bold' },
  actionSection: { marginBottom: theme.spacing.lg },
  trustBanner: { flexDirection: 'row', alignItems: 'center', padding: theme.spacing.md, backgroundColor: 'rgba(143, 248, 178, 0.2)', borderWidth: 1, borderColor: theme.colors.tertiary.fixed, borderRadius: theme.radius.md },
  trustTitle: { ...theme.typography.LabelMD, color: theme.colors.tertiary.container },
  trustDesc: { ...theme.typography.BodySM, color: 'rgba(83, 187, 123, 0.8)' }
});
