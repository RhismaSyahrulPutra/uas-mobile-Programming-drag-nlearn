import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import DetailTableStudent from "./component/detailTableStudent";
import { FontAwesome } from "@expo/vector-icons";
import { supabase } from "../../client/supabaseClient";
import { Picker } from "@react-native-picker/picker";

export default function StudentDataAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [newRole, setNewRole] = useState("teacher");
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: accountData, error: accountError } = await supabase
          .from("account")
          .select("id")
          .eq("role", "student");

        if (accountError) {
          setError(accountError.message);
          return;
        }

        // Extract user_ids from the account data
        const userIds = accountData.map((account) => account.id);

        if (userIds.length === 0) {
          setData([]); // No student data
          return;
        }

        // Step 2: Use the user_ids to fetch data from the profile table
        const { data: profileData, error: profileError } = await supabase
          .from("profile")
          .select("full_name, age, gender, class, account_id")
          .in("account_id", userIds);

        if (profileError) {
          setError(profileError.message);
        } else {
          setData(profileData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter(
    (item) =>
      item.full_name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.class.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = filteredData.slice(firstIndex, lastIndex);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const openRoleModal = (item) => {
    setSelectedItem(item);
    setRoleModalVisible(true);
  };

  const closeRoleModal = () => {
    setRoleModalVisible(false);
    setSelectedItem(null);
    setNewRole(""); // reset the role
  };

  const handleRoleUpdate = async () => {
    try {
      const { error } = await supabase
        .from("account")
        .update({ role: newRole })
        .eq("id", selectedItem.account_id);

      if (error) {
        setError(error.message);
      } else {
        closeRoleModal();
        setData((prevData) =>
          prevData.map((item) =>
            item.account_id === selectedItem.account_id
              ? { ...item, role: newRole }
              : item
          )
        );
        // Fetch data again after updating the role
        fetchData();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = (item) => {
    // Show confirmation modal
    setSelectedItem(item);
    setModalDeleteVisible(true);
  };

  const confirmDelete = async () => {
    if (!selectedItem) return;

    try {
      // Delete from the 'profile' table
      const { error: profileError } = await supabase
        .from("profile")
        .delete()
        .eq("account_id", selectedItem.account_id);

      if (profileError) {
        alert("Error deleting profile: " + profileError.message);
        return;
      }

      // Delete from the 'account' table
      const { error: accountError } = await supabase
        .from("account")
        .delete()
        .eq("id", selectedItem.account_id);

      if (accountError) {
        alert("Error deleting account: " + accountError.message);
        return;
      }

      // Successfully deleted, update the state
      setData((prevData) =>
        prevData.filter((item) => item.account_id !== selectedItem.account_id)
      );

      alert("Student deleted successfully!");
    } catch (err) {
      alert("Error deleting student: " + err.message);
    } finally {
      // Close the modal after deletion
      setModalDeleteVisible(false);
      setSelectedItem(null);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      <View className="bg-white pt-10 pb-3 px-5 flex justify-center items-start shadow-lg fixed top-0 left-0 right-0 z-10">
        <Text className="text-blue-500 text-lg font-bold">Student Data</Text>
      </View>

      <View className="p-4">
        <View className="flex-row items-center space-x-3 p-3 bg-white border border-gray-300 rounded-lg mb-4">
          <TextInput
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
            className="flex-1 p-1 border border-gray-300 rounded-l-lg text-sm"
            style={{ fontSize: 14 }}
          />
          <TouchableOpacity className="bg-blue-500 p-2 rounded-r-lg">
            <Ionicons name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View className="bg-white border border-gray-300 rounded-lg shadow-lg mb-4 p-3">
          <ScrollView horizontal={true}>
            <View className="border border-gray-300 rounded-lg">
              <View className="flex-row justify-between bg-blue-500 p-3 rounded-t-lg">
                <Text className="text-white text-center w-16 font-semibold">
                  No
                </Text>
                <Text className="text-white text-center w-48 font-semibold">
                  Full Name
                </Text>
                <Text className="text-white text-center w-24 font-semibold">
                  Age
                </Text>
                <Text className="text-white text-center w-24 font-semibold">
                  Gender
                </Text>
                <Text className="text-white text-center w-24 font-semibold">
                  Class
                </Text>
                <Text className="text-white text-center w-32 font-semibold">
                  Action
                </Text>
              </View>

              {currentItems.map((item, index) => (
                <View
                  key={index}
                  className={`flex-row justify-between p-3 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } border-b border-gray-300 rounded-lg`}
                >
                  <Text className="text-center w-16">
                    {firstIndex + index + 1}
                  </Text>
                  <Text className="text-center w-48">{item.full_name}</Text>
                  <Text className="text-center w-24">{item.age}</Text>
                  <Text className="text-center w-24">{item.gender}</Text>
                  <Text className="text-center w-24">{item.class}</Text>
                  <View className="flex-row space-x-2">
                    <TouchableOpacity
                      className="bg-blue-500 p-2 rounded-md"
                      onPress={() => openModal(item)}
                    >
                      <Ionicons name="eye" size={16} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="bg-yellow-500 p-2 rounded-md"
                      onPress={() => openRoleModal(item)}
                    >
                      <Ionicons name="create" size={16} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="bg-red-500 p-2 rounded-md"
                      onPress={() => handleDelete(item)}
                    >
                      <FontAwesome name="trash" size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          {filteredData.length > itemsPerPage && (
            <View className="flex-row justify-between p-3">
              <TouchableOpacity
                className="px-2 py-2 bg-blue-500 rounded-md"
                onPress={handlePrevPage}
                disabled={currentPage === 1}
              >
                <Ionicons name="arrow-back" size={20} color="white" />
              </TouchableOpacity>

              <Text className="self-center text-sm">
                Page {currentPage} of {totalPages}
              </Text>

              <TouchableOpacity
                className="px-2 py-2 bg-blue-500 rounded-md"
                onPress={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <Ionicons name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Modal
          isVisible={roleModalVisible}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropOpacity={0.5}
          onBackdropPress={closeRoleModal}
        >
          <View className="bg-white p-6 rounded-lg shadow-lg">
            <Text className="text-lg font-semibold mb-4">
              Update Role for {selectedItem?.full_name}
            </Text>

            {/* Dropdown to select role */}
            <Picker
              selectedValue={newRole}
              onValueChange={(itemValue) => setNewRole(itemValue)}
              style={{
                height: 50,
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 5,
                marginBottom: 15,
              }}
            >
              <Picker.Item label="Admin" value="admin" />
              <Picker.Item label="Guru" value="teacher" />
            </Picker>

            {/* TouchableOpacity for Update Role button */}
            <TouchableOpacity
              onPress={() => handleRoleUpdate(newRole)} // Pass the selected new role
              className="bg-blue-500 p-3 rounded-lg mt-4"
            >
              <Text className="text-white text-center font-semibold">
                Update Role
              </Text>
            </TouchableOpacity>

            {/* Close button */}
            <TouchableOpacity
              onPress={closeRoleModal}
              className="mt-4 border border-blue-500 p-3 rounded-lg"
            >
              <Text className="text-blue-500 text-center font-semibold">
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        {modalVisible && selectedItem && (
          <DetailTableStudent
            visible={modalVisible}
            onClose={closeModal}
            accountId={selectedItem.account_id}
            item={selectedItem}
          />
        )}
        {/* Delete Confirmation Modal */}
        <Modal
          isVisible={modalDeleteVisible}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropOpacity={0.5}
          onBackdropPress={() => setModalDeleteVisible(false)}
        >
          <View className="bg-white p-6 rounded-lg shadow-lg">
            {/* "Are you sure" text with medium font size */}
            <Text className="text-md font-semibold mb-4">
              Are you sure you want to delete {selectedItem?.full_name}?
            </Text>

            {/* Button container with flex-row to align buttons */}
            <View className="flex-row space-x-4 justify-between">
              {/* Delete Button with left alignment and medium text */}
              <TouchableOpacity
                onPress={confirmDelete}
                className="bg-red-500 p-3 rounded-lg flex-1 mr-2"
              >
                <Text className="text-white text-center font-semibold text-md">
                  Delete
                </Text>
              </TouchableOpacity>

              {/* Cancel Button with border and right alignment */}
              <TouchableOpacity
                onPress={() => setModalDeleteVisible(false)}
                className="border border-gray-500 p-3 rounded-lg flex-1 ml-2"
              >
                <Text className="text-gray-500 text-center font-semibold text-md">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
