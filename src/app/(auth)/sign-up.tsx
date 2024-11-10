import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import { Link, Stack } from 'expo-router';
import { supabase } from '@/src/lib/supabase';
import { FontAwesome } from '@expo/vector-icons';

const SignUpScreen = () => {
    const [username, setUsername] = useState(''); // State for first name
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    async function signUpWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: username, 
                },
            },
        });

        if (error) Alert.alert(error.message);
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Sign up' }} />

            <Text style={styles.label}>Username</Text>
            <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="John"
                style={styles.input}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="john@gmail.com"
                style={styles.input}
            />

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="* * * * * "
                    style={styles.passInput}
                    secureTextEntry={!passwordVisible}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
                    <FontAwesome name={passwordVisible ? 'eye' : 'eye-slash'} size={24} color="gray" />
                </TouchableOpacity>
            </View>

            <Button
                onPress={signUpWithEmail}
                disabled={loading}
                text={loading ? 'Creating account...' : 'Create account'}
            />
            <Link href="/sign-in" style={styles.textButton}>
                Sign in
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
        flex: 1,
    },
    label: {
        color: 'gray',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginTop: 5,
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    },
    passInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginTop: 5,
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -20 }],
    },
});

export default SignUpScreen;
