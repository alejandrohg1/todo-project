import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import images from "../../constants/images";
import { commonStyles } from "../../styles/common/styles";
import { styles } from "../../styles/login/styles";
import { Controller, set, useForm } from "react-hook-form";
import { useState } from "react";
import useAuthStore from "../../hooks/useAuthStore";
import { appSignIn } from "../../actions/actionsAuth";




const Login = () => {
  const router = useRouter();
  const { setUser } = useAuthStore((state) => state);
  const [loginError, setErrors] = useState(false)


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {

    const response = await appSignIn(data);
    if (!response.success) {
      setErrors(true);
      console.log(loginError)
    } else {
      setUser(response);
      router.push("/home");
      setErrors(false);
    }

    


  }

  return (
    <SafeAreaView style={styles.container}>

      <Stack.Screen
        options={{
          headerTitle: "",
          headerShadowVisible: false,
          headerShown: false,
        }}
      />

      <View style={styles.imgContainer}>
        <Image source={images.logo} style={styles.logoImage}></Image>
      </View>

      <View style={styles.formContainer}>

        <View>
          <Text style={styles.title}>Sign Up</Text>
        </View>
        {loginError &&
          <View>
            <Text style={{ color: "#FF0000", marginTop: 20 }}>Crendiatls Invalid.</Text>
          </View>}
        <View style={{ marginTop: 30, gap: 25 }}>
          <View>
            <Text style={commonStyles.inputLabel}>Email</Text>

            <Controller
              control={control}
              name='email'
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={commonStyles.textInput}
                  placeholder='example@mail.com'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>

          {errors.email && <Text style={{ color: "#FF0000" }}>This is required.</Text>}

          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <Text style={commonStyles.inputLabel}>Password</Text>
            <Controller
              control={control}
              name='password'
              rules={{
                required: true,
                minLength: 1,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={commonStyles.textInput}
                  secureTextEntry={true}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </View>
          {errors.password && <Text style={{ color: "#FF0000" }}>This is required.</Text>}

          <TouchableOpacity
            style={commonStyles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={commonStyles.textButton}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.registerText}>
            Don't have an account?{" "}
            <Link href='auth/Register' style={styles.signUpText}>
              Sign Up
            </Link>
          </Text>
        </View>

      </View>

    </SafeAreaView>
  );
};

export default Login;
