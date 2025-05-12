
import { TextInput, StyleSheet } from "react-native";

export function EmailInput ({ placeholder = "E-mail", valor, setValor }) {
    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor="black"
            style={styles.input}
            inputMode="email"
            autoCapitalize="none"
            onChangeText={setValor}
            value={valor}
        />
    )
}

export function PasswordInput ({ placeholder = "Senha", valor, setValor }) {
    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor="black"
            style={styles.input}
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={setValor}
            value={valor}
        />
    )
}

export function CustomTextInput ({ placeholder, valor, setValor }) {
    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor="black"
            style={styles.input}
            onChangeText={setValor}
            value={valor}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 15,
        padding: 15,
        fontSize: 20,
        color: 'black',
        marginVertical: 15
    },
})