import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Alert,
    FlatList,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

type User = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  role: "client" | "coiffeuse";
};

const initialClients: User[] = [
  {
    id: 1,
    nom: "Diallo",
    prenom: "Awa",
    email: "awa.diallo@email.com",
    tel: "0700000001",
    role: "client"
  },
  {
    id: 2,
    nom: "Traoré",
    prenom: "Fatou",
    email: "fatou.traore@email.com",
    tel: "0700000002",
    role: "client"
  },
  {
    id: 3,
    nom: "Sow",
    prenom: "Moussa",
    email: "moussa.sow@email.com",
    tel: "0700000003",
    role: "client"
  }
];

export default function ClientsScreen() {
  const [clients, setClients] = useState<User[]>(initialClients);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingClient, setEditingClient] = useState<User | null>(null);
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    tel: "",
    role: "client"
  });

  // CRUD Simulations
  const handleDelete = (id: number) => {
    Alert.alert(
      "Supprimer",
      "Voulez-vous vraiment supprimer ce client ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => setClients(clients.filter((c) => c.id !== id))
        }
      ]
    );
  };

  const handleEdit = (client: User) => {
    setEditingClient(client);
    setForm({
      nom: client.nom,
      prenom: client.prenom,
      email: client.email,
      tel: client.tel,
      role: client.role
    });
    setModalVisible(true);
  };

  const handleAdd = () => {
    setEditingClient(null);
    setForm({
      nom: "",
      prenom: "",
      email: "",
      tel: "",
      role: "client"
    });
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!form.nom || !form.prenom || !form.email || !form.tel) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires.");
      return;
    }
    if (editingClient) {
      setClients((prev) =>
        prev.map((c) =>
          c.id === editingClient.id
            ? { ...c, ...form }
            : c
        )
      );
    } else {
      setClients((prev) => [
        ...prev,
        {
          ...form,
          id: Date.now()
        }
      ]);
    }
    setModalVisible(false);
  };

  // UI
  const renderClient = ({ item }: { item: User }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>
          {item.prenom} {item.nom}
        </Text>
        <Text style={styles.info}>Email : {item.email}</Text>
        <Text style={styles.info}>Téléphone : {item.tel}</Text>
        <Text style={styles.role}>
          {item.role === "client" ? "Client" : "Coiffeuse"}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleEdit(item)} style={styles.iconBtn}>
          <Ionicons name="create-outline" size={22} color="#2196F3" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.iconBtn}>
          <Ionicons name="trash-outline" size={22} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Clients</Text>
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Ionicons name="add-circle" size={28} color="#FF6347" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={clients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderClient}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 40, color: "#888" }}>
            Aucun client pour le moment.
          </Text>
        }
      />

      {/* Modal CRUD */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>
                {editingClient ? "Modifier" : "Ajouter"} un client
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Prénom"
                value={form.prenom}
                onChangeText={(v) => setForm({ ...form, prenom: v })}
              />
              <TextInput
                style={styles.input}
                placeholder="Nom"
                value={form.nom}
                onChangeText={(v) => setForm({ ...form, nom: v })}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={form.email}
                onChangeText={(v) => setForm({ ...form, email: v })}
                keyboardType="email-address"
              />
              <TextInput
                style={styles.input}
                placeholder="Téléphone"
                value={form.tel}
                onChangeText={(v) => setForm({ ...form, tel: v })}
                keyboardType="phone-pad"
              />
              {/* Pour la démo, le rôle est fixé à "client" */}
              <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 16 }}>
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: "#eee" }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: "#FF6347" }]}
                  onPress={handleSave}
                >
                  <Text style={{ color: "#fff" }}>Enregistrer</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
      borderBottomColor: "#eee",
    paddingTop: 40
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#333" },
  addBtn: { padding: 4 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2
  },
  name: { fontSize: 16, fontWeight: "bold", color: "#333" },
  info: { fontSize: 13, color: "#666", marginBottom: 2 },
  role: { fontSize: 13, color: "#FF6347", marginTop: 2 },
  actions: { flexDirection: "row", marginLeft: 8 },
  iconBtn: { marginLeft: 8, padding: 4 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "90%",
    maxHeight: "80%"
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 15
  },
  modalBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginLeft: 10
  }
});