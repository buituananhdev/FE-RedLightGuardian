<template>
    <div>
        <input type="file" @change="handleFileUpload" />
        <button @click="uploadImage">Tải Ảnh Lên</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            selectedFile: null,
        };
    },
    methods: {
        handleFileUpload(event) {
            this.selectedFile = event.target.files[0];
        },
        uploadImage() {
            if (!this.selectedFile) {
                alert('Vui lòng chọn một tệp ảnh để tải lên.');
                return;
            }

            let formData = new FormData();
            formData.append('photo', this.selectedFile);

            axios
                .post('http://localhost:3012/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    alert('Ảnh đã được tải lên thành công!');
                })
                .catch((error) => {
                    console.error('Đã xảy ra lỗi khi tải ảnh lên: ', error);
                    alert('Đã xảy ra lỗi khi tải ảnh lên máy chủ.');
                });
        },
    },
};
</script>
