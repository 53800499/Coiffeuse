import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

const initialServices = [
  {
    id: 1,
    title: "Coupe Femme",
    description: "Coupe et brushing professionnel pour femme",
    price: 3500,
    duration: 60,
    image: require("../../../assets/images/60.png")
  },
  {
    id: 2,
    title: "Coupe Homme",
    description: "Coupe et coiffage professionnelle pour homme",
    price: 2500,
    duration: 30,
    image: require("../../../assets/images/service-2.jpg")
  },
  {
    id: 3,
    title: "Coloration",
    description: "Coloration professionnelle avec produits de qualité",
    price: 4500,
    duration: 90,
    image: require("../../../assets/images/service-3.jpg")
  }
];

export default function ServicesScreen() {
  const [services, setServices] = useState(initialServices);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    image: null
  });

  // CRUD Simulations
  const handleDelete = (id: number) => {
    Alert.alert(
      "Supprimer",
      "Voulez-vous vraiment supprimer ce service ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => setServices(services.filter((s) => s.id !== id))
        }
      ]
    );
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setForm({
      title: service.title,
      description: service.description,
      price: service.price.toString(),
      duration: service.duration.toString(),
      image: service.image
    });
    setModalVisible(true);
  };

  const handleAdd = () => {
    setEditingService(null);
    setForm({
      title: "",
      description: "",
      price: "",
      duration: "",
      image: null
    });
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!form.title || !form.price) {
      Alert.alert("Erreur", "Le titre et le prix sont obligatoires.");
      return;
    }
    if (editingService) {
      setServices((prev) =>
        prev.map((s) =>
          s.id === editingService.id
            ? {
                ...s,
                ...form,
                price: parseFloat(form.price),
                duration: parseInt(form.duration, 10),
                image: form.image || s.image
              }
            : s
        )
      );
    } else {
      setServices((prev) => [
        ...prev,
        {
          ...form,
          id: Date.now(),
          price: parseFloat(form.price),
          duration: parseInt(form.duration, 10),
          image: form.image || require("../../../assets/images/service-1.jpg")
        }
      ]);
    }
    setModalVisible(false);
  };

  // UI
  const renderService = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.description}</Text>
        <Text style={styles.price}>{item.price.toFixed(2)} €</Text>
        <Text style={styles.duration}>Durée : {item.duration} min</Text>
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
        <Text style={styles.headerTitle}>Services</Text>
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Ionicons name="add-circle" size={28} color="#FF6347" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderService}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 40, color: "#888" }}>
            Aucun service pour le moment.
          </Text>
        }
      />

      {/* Modal CRUD */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>
                {editingService ? "Modifier" : "Ajouter"} un service
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Titre"
                value={form.title}
                onChangeText={(v) => setForm({ ...form, title: v })}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                value={form.description}
                onChangeText={(v) => setForm({ ...form, description: v })}
                multiline
              />
              <TextInput
                style={styles.input}
                placeholder="Prix"
                value={form.price}
                onChangeText={(v) => setForm({ ...form, price: v })}
                keyboardType="decimal-pad"
              />
              <TextInput
                style={styles.input}
                placeholder="Durée (min)"
                value={form.duration}
                onChangeText={(v) => setForm({ ...form, duration: v })}
                keyboardType="numeric"
              />
              {/* Pour la démo, pas de gestion d'image upload */}
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
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 14,
    backgroundColor: "#eee"
  },
  title: { fontSize: 16, fontWeight: "bold", color: "#333" },
  desc: { fontSize: 13, color: "#666", marginBottom: 4 },
  price: { fontSize: 15, color: "#2196F3", fontWeight: "bold" },
  duration: { fontSize: 13, color: "#FF6347", marginTop: 2 },
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