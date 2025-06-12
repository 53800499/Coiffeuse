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

const initialProducts = [
  {
    id: 1,
    name: "Shampoing Hydratant",
    description: "Shampoing professionnel pour cheveux secs",
    price: 15.99,
    image: require("../../../assets/images/product-1.jpg"),
    category: "Shampoings"
  },
  {
    id: 2,
    name: "Masque Réparateur",
    description: "Masque intensif pour cheveux abîmés",
    price: 24.99,
    image: require("../../../assets/images/product-2.jpg"),
    category: "Soins"
  },
  {
    id: 3,
    name: "Gel Coiffant",
    description: "Gel fixant longue tenue",
    price: 12.99,
    image: require("../../../assets/images/product-3.jpg"),
    category: "Coiffants"
  }
];

export default function ProduitsScreen() {
  const [products, setProducts] = useState(initialProducts);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null
  });

  // CRUD Simulations
  const handleDelete = (id: number) => {
    Alert.alert(
      "Supprimer",
      "Voulez-vous vraiment supprimer ce produit ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => setProducts(products.filter((p) => p.id !== id))
        }
      ]
    );
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      image: product.image
    });
    setModalVisible(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
      image: null
    });
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price) {
      Alert.alert("Erreur", "Le nom et le prix sont obligatoires.");
      return;
    }
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                ...form,
                price: parseFloat(form.price),
                image: form.image || p.image
              }
            : p
        )
      );
    } else {
      setProducts((prev) => [
        ...prev,
        {
          ...form,
          id: Date.now(),
          price: parseFloat(form.price),
          image: form.image || require("../../../assets/images/product-1.jpg")
        }
      ]);
    }
    setModalVisible(false);
  };

  // UI
  const renderProduct = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.desc}>{item.description}</Text>
        <Text style={styles.price}>{item.price.toFixed(2)} €</Text>
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
        <Text style={styles.title}>Produits</Text>
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Ionicons name="add-circle" size={28} color="#FF6347" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 40, color: "#888" }}>
            Aucun produit pour le moment.
          </Text>
        }
      />

      {/* Modal CRUD */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>
                {editingProduct ? "Modifier" : "Ajouter"} un produit
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Nom"
                value={form.name}
                onChangeText={(v) => setForm({ ...form, name: v })}
              />
              <TextInput
                style={styles.input}
                placeholder="Catégorie"
                value={form.category}
                onChangeText={(v) => setForm({ ...form, category: v })}
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
  title: { fontSize: 22, fontWeight: "bold", color: "#333" },
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
  name: { fontSize: 16, fontWeight: "bold", color: "#333" },
  category: { fontSize: 13, color: "#FF6347", marginBottom: 2 },
  desc: { fontSize: 13, color: "#666", marginBottom: 4 },
  price: { fontSize: 15, color: "#2196F3", fontWeight: "bold" },
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