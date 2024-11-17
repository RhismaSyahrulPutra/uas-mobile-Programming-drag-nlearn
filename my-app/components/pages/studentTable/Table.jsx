import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { FontAwesome } from "react-native-vector-icons";
import Modal from "react-native-modal"; // Import Modal
import DetailModal from "./DetailModal";

export default function Table() {
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

  const groupedData = data.reduce((acc, curr) => {
    if (!acc[curr.class]) {
      acc[curr.class] = [];
    }
    acc[curr.class].push(curr);
    return acc;
  }, {});

  const TableWithPagination = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const itemsPerPage = 5;

    const filteredData = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.username.toLowerCase().includes(searchText.toLowerCase())
    );

    useEffect(() => {
      setCurrentPage(1);
    }, [data]);

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = filteredData.slice(firstIndex, lastIndex);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handleNextPage = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
      <View>
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

        <ScrollView horizontal={true}>
          <View className="border border-gray-300 rounded-lg">
            <View className="flex-row justify-between bg-blue-500 p-3 rounded-t-lg">
              <Text className="text-white text-center w-16 font-semibold">
                No
              </Text>
              <Text className="text-white text-center w-48 font-semibold">
                Nama Peserta Didik
              </Text>
              <Text className="text-white text-center w-48 font-semibold">
                Username
              </Text>
              <Text className="text-white text-center w-24 font-semibold">
                Kelas
              </Text>
              <Text className="text-white text-center w-32 font-semibold">
                Course Selesai
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
                } border-b border-gray-300`}
              >
                <Text className="text-center w-16">{index + 1}</Text>
                <Text className="text-center w-48">{item.name}</Text>
                <Text className="text-center w-48">{item.username}</Text>
                <Text className="text-center w-24">{item.class}</Text>
                <Text className="text-center w-32">{`${item.coursesCompleted}/${item.totalCourses}`}</Text>
                <View className="flex-row space-x-2">
                  <TouchableOpacity
                    className="bg-blue-500 p-2 rounded-md"
                    onPress={() => openModal(item)}
                  >
                    <Ionicons name="eye" size={16} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-yellow-500 p-2 rounded-md"
                    onPress={() => console.log("Pindah Kelas", item)}
                  >
                    <Ionicons name="swap-horizontal" size={16} color="white" />
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
    );
  };

  const [expandedClass, setExpandedClass] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // State to control the modal visibility
  const [selectedItem, setSelectedItem] = useState(null); // State to store the selected item for the modal

  const openModal = (item) => {
    setSelectedItem(item); // Set the selected item when the button is pressed
    setModalVisible(true); // Show the modal
  };

  const closeModal = () => {
    setModalVisible(false); // Close the modal
    setSelectedItem(null); // Clear the selected item
  };

  return (
    <View className="flex-1 bg-gray-100">
      <View className="bg-white pt-10 pb-3 px-5 flex justify-center items-start shadow-lg fixed top-0 left-0 right-0 z-10">
        <Text className="text-blue-500 text-lg font-bold">Student Data</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 10, paddingTop: 25 }}
      >
        {Object.keys(groupedData).map((classKey) => (
          <View
            key={classKey}
            className="mb-8 bg-white p-4 rounded-lg shadow-md"
          >
            <TouchableOpacity
              onPress={() =>
                setExpandedClass(expandedClass === classKey ? null : classKey)
              }
              className="flex-row justify-between items-center mb-4"
            >
              <Text className="text-xl font-semibold">Kelas {classKey}</Text>
              <Ionicons
                name={
                  expandedClass === classKey ? "chevron-up" : "chevron-down"
                }
                size={20}
              />
            </TouchableOpacity>

            {expandedClass === classKey && (
              <TableWithPagination data={groupedData[classKey]} />
            )}
          </View>
        ))}
      </ScrollView>

      {/* Modal for displaying detailed item */}
      <DetailModal
        isVisible={modalVisible}
        selectedItem={selectedItem}
        closeModal={closeModal}
      />
    </View>
  );
}
