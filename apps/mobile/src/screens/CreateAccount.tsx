// Create Account — Mobile 390 (Figma 146:71). Step 1 of 4; sign-up itself is
// Supabase Auth (stubbed like sign-in), so Continue enters the app.
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "../components/Icon";
import { Button, Logo } from "../components/ui";
import { c, t } from "../theme";

const STEPS = 4;

export function CreateAccountScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [terms, setTerms] = useState(false);
  const ready = name.trim().length > 1 && /\S+@\S+\.\S+/.test(email) && password.length >= 12 && terms;

  const input = (label: string, value: string, set: (v: string) => void, props: Partial<React.ComponentProps<typeof TextInput>> = {}, trailing?: React.ReactNode) => (
    <View style={st.field}>
      <Text style={t("labelL", "textPrimary")}>{label}</Text>
      <View style={st.input}>
        <TextInput style={[t("bodyM", "textPrimary"), st.flex]} value={value} onChangeText={set} placeholderTextColor={c.textPlaceholder} accessibilityLabel={label} {...props} />
        {trailing}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView style={st.screen} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={[st.content, { paddingTop: insets.top + 56 }]} keyboardShouldPersistTaps="handled">
        <Logo />
        <View style={st.heading}>
          <Text style={t("overline", "textBrand")}>STEP 1 OF {STEPS}</Text>
          <Text style={t("h1", "textPrimary")} accessibilityRole="header">Create your account</Text>
          <Text style={t("bodyM", "textSecondary")}>Only this step is required. Health and training details can come later.</Text>
        </View>
        <View style={st.stepper} accessibilityLabel={`Step 1 of ${STEPS}`}>
          {Array.from({ length: STEPS }, (_, i) => (
            <View key={i} style={[st.step, { backgroundColor: c[i === 0 ? "bgBrand" : "bgSubtle"] }]} />
          ))}
        </View>
        <View style={st.form}>
          {input("Full name", name, setName, { placeholder: "Alex Carter", autoComplete: "name", textContentType: "name" })}
          {input("Email address", email, setEmail, { placeholder: "alex.carter@email.com", keyboardType: "email-address", autoCapitalize: "none", autoComplete: "email", textContentType: "emailAddress" })}
          {input(
            "Password",
            password,
            setPassword,
            { placeholder: "At least 12 characters", secureTextEntry: !show, autoComplete: "new-password", textContentType: "newPassword" },
            <Pressable accessibilityRole="button" accessibilityLabel={show ? "Hide password" : "Show password"} onPress={() => setShow(!show)} hitSlop={8}>
              <Icon name="eye-18" color="iconSubtle" />
            </Pressable>,
          )}
          <Pressable accessibilityRole="checkbox" accessibilityState={{ checked: terms }} onPress={() => setTerms(!terms)} style={st.consent}>
            <View style={[st.box, terms && st.boxOn]}>{terms && <View style={st.tick} />}</View>
            <Text style={[t("bodyS", "textSecondary"), st.flex]}>I agree to the Terms of Service and Privacy Policy.</Text>
          </Pressable>
          <Button label="Continue" onPress={() => ready && router.replace("/")} style={!ready && st.disabled} />
        </View>
      </ScrollView>
      <View style={[st.footer, { paddingBottom: insets.bottom + 36 }]}>
        <Text style={t("bodyM", "textSecondary")}>Already have an account? </Text>
        <Link href="/sign-in" style={t("bodyMStrong", "textLink")}>Sign In</Link>
      </View>
    </KeyboardAvoidingView>
  );
}

const st = StyleSheet.create({
  screen: { flex: 1, backgroundColor: c.bgSurface },
  content: { paddingHorizontal: 24, gap: 24 },
  heading: { gap: 8 },
  stepper: { flexDirection: "row", gap: 6 },
  step: { flex: 1, height: 5, borderRadius: 999 },
  form: { gap: 16 },
  field: { gap: 7 },
  input: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 14, paddingVertical: 13, borderRadius: 8, borderWidth: 1, borderColor: c.borderDefault, backgroundColor: c.bgCanvas },
  flex: { flex: 1, padding: 0 },
  consent: { flexDirection: "row", alignItems: "center", gap: 11 },
  box: { width: 18, height: 18, borderRadius: 5, borderWidth: 1, borderColor: c.borderStrong, alignItems: "center", justifyContent: "center", backgroundColor: c.bgSurface },
  boxOn: { backgroundColor: c.bgBrand, borderColor: c.bgBrand },
  tick: { width: 8, height: 8, borderRadius: 2, backgroundColor: c.textOnBrand },
  disabled: { opacity: 0.55 },
  footer: { flexDirection: "row", justifyContent: "center", alignItems: "center", paddingTop: 12 },
});
