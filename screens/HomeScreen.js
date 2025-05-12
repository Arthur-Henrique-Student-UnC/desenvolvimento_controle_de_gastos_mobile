// import { View, TextInput, SafeAreaView, Text, StyleSheet } from "react-native";
// import { auth, signOut, db } from '../firebase.js';
// import { DangerButton, PrimaryButton } from "../components/Button.js";
// import { CustomTextInput } from "../components/CustomInput.js";
// import { useState, useEffect } from "react";
// import { Timestamp, updateDoc, doc, deleteDoc, collection, addDoc, getDocs, query, where } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";

import { View, TextInput, SafeAreaView, Text, StyleSheet, ScrollView } from "react-native";
import { auth, signOut, db } from '../firebase.js';
import { DangerButton, PrimaryButton } from "../components/Button.js";
import { CustomTextInput } from "../components/CustomInput.js";
import { useState, useEffect } from "react";
import { Timestamp, updateDoc, doc, deleteDoc, collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function HomeScreen () {

    const [user, setUser] = useState(null);
    const [authInitialized, setAuthInitialized] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthInitialized(true);
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
  if (!user) {
    console.log("No user - skipping load");
    return;
  }

  try {
    console.log("Loading expenses for user:", user.uid);
    const snapshot = await getDocs(
      query(
        collection(db, "records"),
        where("user_id", "==", user.uid)
      )
    );
    console.log("Firestore response:", snapshot.docs.length, "documents");
    
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setGastos(data);
  } catch (error) {
    console.error("Error loading expenses:", error);
  }
};

useEffect(() => {
  console.log("Loaded expenses:", gastos);
}, [gastos]);

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

    if (!authInitialized){
        alert("O sistema ainda está inicializando");
        return;
    }
    
    if (!user) {  // Add this check
    alert("Por favor, faça login primeiro!");
    return;
    }

    console.log("Enviando:", {
    descricao,
    valor: parseFloat(valor),
    user: user.uid
});

  // Add validation
  if (!descricao.trim() || isNaN(parseFloat(valor))) {
    alert("Descrição e valor são obrigatórios!");
    return;
  }

  await addDoc(collection(db, "records"), {
    descricao: descricao.trim(), // Trim whitespace
    valor: parseFloat(valor),    // Ensure number conversion
    data: Timestamp.now(),       // Better timestamp method
    user_id: user.uid
  });

  await carregarGastos();
  setDescricao('');
  setValor('');
};

const atualizarGasto = async () => {
    if (!editingId) return;

    await updateDoc(doc(db, "records", editingId), {
    descricao,
    valor: parseFloat(valor),
    data: Timestamp.fromDate(new Date())
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
    <SafeAreaView style={styles.container}>
      {!authInitialized ? (
        <View style={styles.loadingContainer}>
          <Text>Carregando...</Text>
        </View>
      ) : user ? (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.title}>CONTROLE DE GASTOS</Text>
          
          <View style={styles.header}>
            <DangerButton text={'Desconectar'} action={logout} />
          </View>

          <View style={styles.formContainer}>
            <CustomTextInput
              placeholder="Descrição do gasto"
              valor={descricao}
              setValor={setDescricao}
              style={styles.input}
            />

            <CustomTextInput
              placeholder="Valor (ex: 10.50)"
              valor={valor}
              setValor={setValor}
              style={styles.input}
            />

            <PrimaryButton
              text={editingId ? "Atualizar Gasto" : "Adicionar Gasto"}
              action={editingId ? atualizarGasto : adicionarGasto}
              style={styles.addButton}
            />
          </View>

          <View style={styles.expensesContainer}>
            {gastos.length > 0 ? (
              gastos.map((gasto) => (
                <View key={gasto.id} style={styles.expenseItem}>
                  <View style={styles.expenseDetails}>
                    <Text style={styles.expenseDescription}>{gasto.descricao}</Text>
                    <Text style={styles.expenseValue}>R$ {gasto.valor.toFixed(2)}</Text>
                    <Text style={styles.expenseDate}>
                      {gasto.data?.toDate().toLocaleDateString('pt-BR')}
                    </Text>
                  </View>
                  
                  <View style={styles.expenseActions}>
                    <PrimaryButton
                      text="Editar"
                      action={() => {
                        setEditingId(gasto.id);
                        setDescricao(gasto.descricao);
                        setValor(gasto.valor.toString());
                        setData(gasto.data?.toDate());
                      }}
                      style={styles.actionButton}
                    />
                    <DangerButton
                      text="Excluir"
                      action={() => excluirGasto(gasto.id)}
                      style={styles.actionButton}
                    />
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.emptyMessage}>Nenhum gasto cadastrado</Text>
            )}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.loginContainer}>
          <Text style={styles.loginMessage}>Por favor, faça login</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginMessage: {
    fontSize: 18,
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
  },
  formContainer: {
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  addButton: {
    marginTop: 10,
  },
  expensesContainer: {
    marginBottom: 20,
  },
  expenseItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expenseDetails: {
    flex: 1,
  },
  expenseDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  expenseValue: {
    fontSize: 16,
    color: '#e74c3c',
    marginBottom: 5,
  },
  expenseDate: {
    fontSize: 14,
    color: '#777',
  },
  expenseActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
    marginTop: 20,
  },
});