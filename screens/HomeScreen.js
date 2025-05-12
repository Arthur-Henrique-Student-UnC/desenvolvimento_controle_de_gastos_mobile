import { TextInput, SafeAreaView, Text, StyleSheet } from "react-native";
import { auth, signOut, db } from '../firebase.js';
import { DangerButton, PrimaryButton } from "../components/Button.js";
import { CustomTextInput } from "../components/CustomInput.js";
import { useState, useEffect } from "react";
import { Timestamp, updateDoc, doc, deleteDoc, collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function HomeScreen () {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return unsubscribe;
    }, []);

    const logout = async () => {
        await signOut(auth);
    }

    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState(new Date());
    const [editingId, setEditingId] = useState(null);
    const [gastos, setGastos] = useState([]);

    //This section is responsible to load the records from the database, filtering by the user's ID.

    // const loadRecords = async () => {
    //     const snapshot = await getDocs(
    //         query(
    //             collection(db, 'records'),
    //             where('user_id', '==', user.uid)
    //         )
    //     );
    // // After the loading of data, React maps the documents into an array, each one with id and its data.
    //     const records = snapshot.docs.map((doc) => ({
    //         id: doc.id,
    //         ...doc.data()
    //     }));
        
    //     //This part is responsible to update the list.
    //     setList(records);

    //     console.log(records);
    // }

    const carregarGastos = async () => {
    const snapshot = await getDocs(
    query(
        collection(db, "records"),
        where("user_id", "==", user.uid)
    )
);
    const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
    }));
    setGastos(data);
};

    //This part will load the records when the user changes.
    useEffect(() => {
        if (!user) {
            return;
        }
        carregarGastos();
    }, [user]);

    //This part is responsible to add documents, or records, to Firebase's database.

    //So, if there isn't a text, it will return the error. But, if there's a text, it will use the function addDoc, aiming a collection, as used after addDoc, with the parameters db, that's the mandatory parameter to add a record to the database. After this, it is mandatory to inform the name of the collection, that's 'records'.

    // const add = async () => {
    //     console.log(user.uid);

    //     if (!text) {
    //         console.log('preencha o campo.');
    //         return;
    //     }

    //     await addDoc(collection(db, 'records'), {
    //         text: text,
    //         user_id: user.uid
    //     });

    //     loadRecords();

    //     setText('');
    // }

    const adicionarGasto = async () => {
        if (!descricao || !valor) {
        alert("Please fill all fields!");
    return;
}

    await adicionarGasto(collection(db, "records"), {
    descricao,
    valor: parseFloat(valor),
    data: Timestamp.fromDate(new Date(data)),
    user_id: user.uid
});

    carregarGastos(); // Refresh list
    setDescricao(""); 
    setValor("");
};

const atualizarGasto = async () => {
    if (!editingId) return;

    await updateDoc(doc(db, "records", editingId), {
    descricao,
    valor: parseFloat(valor),
    data: Timestamp.fromDate(new Date(data))
});

carregarGastos();
  setEditingId(null); // Exit edit mode
};

const excluirGasto = async (id) => {
    await deleteDoc(doc(db, "records", id));
    carregarGastos();
};

useEffect(() => {
    console.log('Descrição atual:', descricao);
}, [descricao]);

useEffect(() => {
    console.log('Valor atual:', valor);
}, [valor]);


    return (
        <SafeAreaView style={{ margin: 20 }}>
            <Text style={styles.title} >TO DO LIST</Text>
            <DangerButton text={'Desconectar'} action={logout} />

            {/* <CustomTextInput placeholder={'Digite o texto...'} value={text} setValue={setText} />

            <PrimaryButton text="Adicionar Registro" action={() => {
                add();
            }} />

            {list.map((item) => (
                <Text key={item.id}>{item.text}</Text>
            ))}

            {list.length > 0 ? (
                list.map((item) => <Text key={item.id}>{item.text}</Text>)
            ) : (
                <Text>No expenses found. Add one!</Text>
            )} */}

            <CustomTextInput
                placeholder="Descrição"
                value={descricao}
                onChangeText={(texto) => setDescricao(texto)}
            />

            <CustomTextInput
            placeholder="Value (e.g., 10.50)"
            value={valor}
            onChangeText={setValor}
            keyboardType="numeric"
            />

            <PrimaryButton
            text="Adicionar Gasto"
            title={editingId ? "Atualizar gasto" : "Atualizar gasto"} 
            onPress={editingId ? atualizarGasto : adicionarGasto} 
            />

            {gastos.map((gasto) => (
                <View key={gasto.id} style={styles.expenseItem}>
                <Text>{gasto.descricao}</Text>
                <Text>R${gasto.valor}</Text>
                <Text>{gasto.data?.toDate().toLocaleDateString()}</Text>
    
            <PrimaryButton
            title="Edit" 
            onPress={() => {
                setEditingId(gasto.id);
                setDescricao(gasto.descricao);
                setValor(gasto.valor.toString());
                setData(gasto.data?.toDate());
            }} 
            />
    
            <PrimaryButton
            title="Delete" 
            onPress={() => excluirGasto(gasto.id)} 
            />
            </View>
))}


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 30,
        margin: 40
    },
    logoutButton: {
        backgroundColor: 'red',
        padding: 15,
        margin: 30,
        borderRadius: 15
    },
    logoutButtonText: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    item: {
        padding: 10,
        margin: 5,
        backgroundColor: '#f0f0f0', // Light gray background
        borderRadius: 5,
    },
})