import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import DetailModal from "./DetailModal";
import { supabase } from "../../client/supabaseClient";

export default function Table() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedClass, setExpandedClass] = useState(null); // Initialize expandedClass state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const { data: accountData, error: accountError } = await supabase
          .from("account")
          .select("id")
          .eq("role", "student");

        if (accountError) throw accountError;

        return accountData.map((account) => account.id);
      } catch (error) {
        console.error("Error fetching accounts:", error.message);
        setError("Failed to fetch account data.");
        return [];
      }
    };

    const fetchProfiles = async (userIds) => {
      try {
        if (userIds.length === 0) return [];

        const { data: profileData, error: profileError } = await supabase
          .from("profile")
          .select(
            "profile_image, birth_date, full_name, age, gender, class, account_id"
          )
          .in("account_id", userIds);

        if (profileError) throw profileError;

        return profileData;
      } catch (error) {
        console.error("Error fetching profiles:", error.message);
        setError("Failed to fetch profile data.");
        return [];
      }
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch account IDs
        const userIds = await fetchAccounts();

        // Fetch profile data based on account IDs
        const profileData = await fetchProfiles(userIds);

        setData(profileData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        item.full_name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.age.toString().includes(searchText)
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
      <View className="mt-5">
        {/* Search Bar */}
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

        {/* Table */}
        <ScrollView horizontal={true}>
          <View className="border border-gray-300 rounded-lg">
            {/* Header */}
            <View className="flex-row bg-blue-500 p-3 rounded-t-lg">
              <Text className="text-white text-center w-10 font-semibold">
                No
              </Text>
              <Text className="text-white text-center w-60 font-semibold">
                Full Name
              </Text>
              <Text className="text-white text-center w-12 font-semibold">
                Age
              </Text>
              <Text className="text-white text-center w-36 font-semibold">
                Gender
              </Text>
              <Text className="text-white text-center w-36 font-semibold">
                Class
              </Text>
              <Text className="text-white text-center font-semibold">
                Action
              </Text>
            </View>

            {/* Data Rows */}
            {currentItems.map((item, index) => (
              <View
                key={index}
                className={`flex-row justify-between p-3 ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } border-b border-gray-300`}
              >
                <Text className="text-center w-10">{index + 1}</Text>
                <Text className="text-center w-60">{item.full_name}</Text>
                <Text className="text-center w-12">{item.age}</Text>
                <Text className="text-center w-36">{item.gender}</Text>
                <Text className="text-center w-36">{item.class}</Text>
                <View className="flex-row space-x-2">
                  <TouchableOpacity
                    className="bg-blue-500 p-2 rounded-md"
                    onPress={() => openModal(item)}
                  >
                    <Ionicons name="eye" size={16} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Pagination */}
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
      {/* Header */}
      <View className="bg-white pt-10 pb-3 px-5 flex justify-center items-start shadow-lg fixed top-0 left-0 right-0 z-10">
        <Text className="text-blue-500 text-lg font-bold">Student Data</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 10, paddingTop: 25 }}
      >
        {/* Grouped Data by Class */}
        {Object.keys(groupedData).map((classKey) => (
          <View
            key={classKey}
            className="mb-8 bg-white p-4 rounded-lg shadow-md"
          >
            <TouchableOpacity
              onPress={() =>
                setExpandedClass(expandedClass === classKey ? null : classKey)
              }
            >
              <Text className="text-lg font-semibold text-blue-500">
                {classKey}
              </Text>
            </TouchableOpacity>

            {expandedClass === classKey && (
              <TableWithPagination data={groupedData[classKey]} />
            )}
          </View>
        ))}
      </ScrollView>

      {/* Modal */}
      {modalVisible && selectedItem && (
        <DetailModal
          visible={modalVisible}
          onClose={closeModal}
          accountId={selectedItem.account_id} // Kirim account_id ke modal
          item={selectedItem} // Kirim seluruh data yang relevan
        />
      )}
    </View>
  );
}
