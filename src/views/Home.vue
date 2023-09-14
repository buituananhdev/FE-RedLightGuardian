<template>
    <div class="h-full w-full">
        <div class="container mx-auto py-10">
            <h1 class="text-3xl font-bold mb-5">User List</h1>
            <input type="text" placeholder="Search..." v-model="searchVal" @input="search">
            <div class="overflow-x-auto">
                <table class="table-auto border-collapse border border-gray-400 w-full">
                    <thead>
                        <tr class="">
                            <th class="p-3 text-left">Name</th>
                            <th class="p-3 text-left">Email</th>
                            <th class="p-3 text-left">Gender</th>
                            <th class="p-3 text-left">Age</th>
                            <th class="p-3 text-left">Create</th>
                            <th class="p-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody class="overflow-auto h-[500px]">
                        <tr class="border border-gray-400" v-for="(user, index) in listUsers" :key="index">
                            <td class="p-3">{{ user.fullname }}</td>
                            <td class="p-3">{{ user.email }}</td>
                            <td class="p-3">{{ user.gender === 1 ? "Male" : "Female" }}</td>
                            <td class="p-3">{{ user.age }}</td>
                            <td class="p-3">{{ formatDate(user.created_at) }}</td>
                            <td class="relative p-3">
                                <button @click="showPopup(index)" type="button" class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-gray-500 hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"> 
                                    Actions 
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                </button>
                                <div :id="'action-' + index" data-display="none" class="popup hidden absolute right-0 w-32 mt-1 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 focus:outline-none">
                                    <div class="px-1 py-1 popup">
                                        <button class="popup hover:bg-gray-400 hover:text-white text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm" >
                                            <svg xmlns="http://www.w3.org/2000/svg" class="popup w-5 h-5 mr-2 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                            Edit
                                        </button>
                                        <button @click="deleteUser(user.id)" class="popup hover:bg-red-400 hover:text-white text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="popup w-5 h-5 mr-2 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg> 
                                            Delete 
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
const api = inject('api');
const listUsers = ref([]);
const fetchData = async () => {
    try {
        const response = await api.GetListUsers();
        listUsers.value = response.data.data;
    } catch (error) {
        console.log(error);
    }
}

const formatDate = (date) =>  {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Intl.DateTimeFormat('vi-VN', options).format(new Date(date));
}

onMounted(() => {
    fetchData();
})

const deleteUser = async (id) =>  {
    try {
        await api.DeleteUser(id);
        listUsers.value = this.listUsers.filter(user => user.id !== id);
        this.closeAllPopup();
    } catch (error) {
        console.log(error);
    }
}

const closeAllPopup = () => {
    const popups = document.querySelectorAll('td.relative > div');
    popups.forEach(p => p.style.display = "none");
}

const autoClosePopup = (e) => {
    if (e.target.classList.contains('popup')) return;
    closeAllPopup();
}

const showPopup = (id) => {
    closeAllPopup()
    const popup = document.querySelector("#action-" + id)
    if (popup.dataset.display == "none") {
        popup.style.display = "block"
        popup.dataset.display = "block"
    } else {
        popup.style.display = "none"
        popup.dataset.display = "none"
    }
}
</script>

<style>

</style>