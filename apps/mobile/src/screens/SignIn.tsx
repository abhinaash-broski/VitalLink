import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "../components/Icon";
import { Button, Logo } from "../components/ui";
import { c, t } from "../theme";

export function SignInScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("alex.carter@email.com");
  const [password, setPassword] = useState("correcthorse");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);

  // Real sign-in goes through Supabase Auth; the mock build just enters the app.
  const signIn = () => router.replace("/");

  return (
    <ScrollView style={st.screen} contentContainerStyle={[st.content, { paddingTop: insets.top + 56, paddingBottom: insets.bottom + 36 }]}>
      <Logo />
      <View style={st.head}>
        <Text style={t("h1", "textPrimary")} accessibilityRole="header">
          Welcome back
        </Text>
        <Text style={t("bodyL", "textSecondary")}>Sign in to your VitalLink account.</Text>
      </View>

      <View style={st.form}>
        <View style={st.field}>
          <Text style={t("labelL", "textPrimary")}>Email or phone</Text>
          <TextInput
            style={[st.input, t("bodyM", "textPrimary")]}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoComplete="username"
            keyboardType="email-address"
            accessibilityLabel="Email or phone"
          />
        </View>
        <View style={st.field}>
          <Text style={t("labelL", "textPrimary")}>Password</Text>
          <View>
            <TextInput
              style={[st.input, t("bodyM", "textPrimary"), { paddingRight: 48 }]}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!show}
              autoComplete="current-password"
              accessibilityLabel="Password"
            />
            <Pressable style={st.eye} onPress={() => setShow((v) => !v)} accessibilityRole="button" accessibilityLabel={show ? "Hide password" : "Show password"}>
              <Icon name="eye-18" color="iconSubtle" />
            </Pressable>
          </View>
        </View>

        <View style={st.between}>
          <Pressable style={st.check} onPress={() => setRemember((v) => !v)} accessibilityRole="checkbox" accessibilityState={{ checked: remember }}>
            <View style={[st.box, remember && st.boxOn]}>{remember && <View style={st.tick} />}</View>
            <Text style={t("bodyM", "textSecondary")}>Remember me</Text>
          </Pressable>
          <Text style={t("bodyMStrong", "textLink")} accessibilityRole="link">
            Forgot password?
          </Text>
        </View>

        <Button label="Sign In" onPress={signIn} />

        <View style={st.or}>
          <View style={st.rule} />
          <Text style={t("caption", "textTertiary")}>or</Text>
          <View style={st.rule} />
        </View>

        <View style={st.social}>
          <Button variant="outline" label="Continue with Google" style={st.outline} />
          <Button variant="outline" label="Continue with Apple" style={st.outline} />
        </View>
      </View>

      <View style={st.footer}>
        <Text style={t("bodyM", "textSecondary")}>New to VitalLink? </Text>
        <Text style={t("bodyMStrong", "textLink")} accessibilityRole="link" onPress={() => router.push("/create-account")}>
          Create Account
        </Text>
      </View>
    </ScrollView>
  );
}

const st = StyleSheet.create({
  screen: { flex: 1, backgroundColor: c.bgSurface },
  content: { flexGrow: 1, paddingHorizontal: 24 },
  head: { marginTop: 26, gap: 6 },
  form: { marginTop: 26, gap: 18 },
  field: { gap: 8 },
  input: {
    backgroundColor: c.bgCanvas,
    borderWidth: 1,
    borderColor: c.borderDefault,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  eye: { position: "absolute", right: 6, top: 0, bottom: 0, width: 40, alignItems: "center", justifyContent: "center" },
  between: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  check: { flexDirection: "row", alignItems: "center", gap: 9 },
  box: { width: 18, height: 18, borderRadius: 5, borderWidth: 1, borderColor: c.borderDefault, alignItems: "center", justifyContent: "center" },
  boxOn: { backgroundColor: c.bgBrand, borderColor: c.bgBrand },
  tick: { width: 8, height: 8, borderRadius: 2, backgroundColor: c.textOnBrand },
  or: { flexDirection: "row", alignItems: "center", gap: 20 },
  rule: { flex: 1, height: 1, backgroundColor: c.borderSubtle },
  social: { gap: 18 },
  outline: { paddingVertical: 15 },
  footer: { marginTop: "auto", paddingTop: 32, flexDirection: "row", justifyContent: "center", gap: 4 },
});
