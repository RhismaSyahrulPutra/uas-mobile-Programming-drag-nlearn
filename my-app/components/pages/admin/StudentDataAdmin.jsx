import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import DetailTableStudent from "./component/detailTableStudent";

export default function StudentDataAdmin() {
  const data = [
    {
      no: 1,
      name: "Ahmad",
      username: "ahmad123",
      class: "10A",
      coursesCompleted: 2,
      totalCourses: 4,
    },
    {
      no: 2,
      name: "Budi",
      username: "budi456",
      class: "10B",
      coursesCompleted: 3,
      totalCourses: 4,
    },
    {
      no: 3,
      name: "Citra",
      username: "citra789",
      class: "10A",
      coursesCompleted: 4,
      totalCourses: 4,
    },
    {
      no: 4,
      name: "Dewi",
      username: "dewi987",
      class: "10B",
      coursesCompleted: 2,
      totalCourses: 4,
    },
    {
      no: 5,
      name: "Eko",
      username: "eko654",
      class: "10C",
      coursesCompleted: 3,
      totalCourses: 4,
    },
    {
      no: 6,
      name: "Fajar",
      username: "fajar432",
      class: "10C",
      coursesCompleted: 4,
      totalCourses: 4,
    },
    {
      no: 7,
      name: "Gilang",
      username: "gilang987",
      class: "10A",
      coursesCompleted: 1,
      totalCourses: 4,
    },
    {
      no: 8,
      name: "Hana",
      username: "hana345",
      class: "10B",
      coursesCompleted: 2,
      totalCourses: 4,
    },
    {
      no: 9,
      name: "Ika",
      username: "ika123",
      class: "10C",
      coursesCompleted: 3,
      totalCourses: 4,
    },
    {
      no: 10,
      name: "Joko",
      username: "joko456",
      class: "10C",
      coursesCompleted: 4,
      totalCourses: 4,
    },
    {
      no: 11,
      name: "Lia",
      username: "lia001",
      class: "10A",
      coursesCompleted: 3,
      totalCourses: 4,
    },
    {
      no: 12,
      name: "Mia",
      username: "mia002",
      class: "10A",
      coursesCompleted: 2,
      totalCourses: 4,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const itemsPerPage = 5;

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.username.toLowerCase().includes(searchText.toLowerCase())
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

  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

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
          <TouchableOpacity className="bg-green-500 p-2 ml-4 rounded-lg">
            <FontAwesome name="download" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Card yang membungkus tabel */}
        <View className="bg-white border border-gray-300 rounded-lg shadow-lg mb-4 p-3">
          <ScrollView horizontal={true}>
            <View className="border border-gray-300 rounded-lg">
              <View className="flex-row justify-between bg-blue-500 p-3 rounded-t-lg">
                <Text className="text-white text-center w-16 font-semibold">
                  No
                </Text>
                <Text className="text-white text-center w-48 font-semibold">
                  Nama Siswa
                </Text>
                <Text className="text-white text-center w-48 font-semibold">
                  Username
                </Text>
                <Text className="text-white text-center w-24 font-semibold">
                  Kelas
                </Text>
                <Text className="text-white text-center w-32 font-semibold">
                  Kursus (Selesai/Total)
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
                  <Text className="text-center w-16">{item.no}</Text>
                  <Text className="text-center w-48">{item.name}</Text>
                  <Text className="text-center w-48">{item.username}</Text>
                  <Text className="text-center w-24">{item.class}</Text>
                  <Text className="text-center w-32">
                    {item.coursesCompleted}/{item.totalCourses}
                  </Text>
                  <View className="flex-row space-x-2">
                    <TouchableOpacity
                      className="bg-blue-500 p-2 rounded-md"
                      onPress={() => openModal(item)}
                    >
                      <Ionicons name="eye" size={16} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="bg-yellow-500 p-2 rounded-md"
                      onPress={() => console.log("Update", item)}
                    >
                      <Ionicons name="create" size={16} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="bg-red-500 p-2 rounded-md"
                      onPress={() => console.log("Delete", item)}
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

        {/* Tombol Tambah */}
        <TouchableOpacity
          className="flex-row items-center justify-center bg-green-500 p-3 rounded-lg mt-4"
          onPress={() => console.log("Add new student")}
        >
          <Ionicons name="add" size={20} color="white" />
          <Text className="text-white font-semibold ml-2">Tambah Siswa</Text>
        </TouchableOpacity>
      </View>

      <DetailTableStudent
        isVisible={modalVisible}
        selectedItem={selectedItem}
        onClose={closeModal}
      />
    </View>
  );
}
