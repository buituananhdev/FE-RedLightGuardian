<template>
    <div class="draw-container">
        <canvas
            ref="canvas"
            width="1280"
            height="720"
            style="border: 1px solid black"
            @mousedown="startDrawing"
            @mouseup="stopDrawing"
        >
        </canvas>
        <div class="button-container">
            <button @click="saveCoordinates">Lưu Tọa Độ vào JSON</button>
            <button @click="tryLoadCoordinates">Tải Tọa Độ từ JSON</button>
            <button @click="resetDrawing">Xóa Hình</button>
            <button @click="confirmDrawing">Xác Nhận</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            canvas: null,
            ctx: null,
            isDrawing: false,
            dangerZone: [],
            isConfirmed: false,
            coordinatesData: [],
            drawDelay: 500, // Thời gian trễ (0.5 giây)
        }
    },
    computed: {
        canStartDrawing() {
            return !this.isDrawing
        },
    },
    mounted() {
        this.canvas = this.$refs.canvas
        this.ctx = this.canvas.getContext('2d')
        this.tryLoadCoordinates() // Thử tải tọa độ khi component được mounted
    },
    methods: {
        tryLoadCoordinates() {
            axios
                .get('http://localhost:3011/api/cameras/1') // Thay đổi URL để lấy thông tin của camera có id 1
                .then((response) => {
                    const cameraData = response.data
                    if (cameraData.coordinates) {
                        // Kiểm tra nếu camera có thông tin tọa độ
                        this.dangerZone = JSON.parse(cameraData.coordinates) // Chuyển chuỗi JSON thành mảng tọa độ
                        this.redrawCoordinates() // Gọi hàm vẽ lại hình sau khi tải dữ liệu
                    } else {
                        alert('Camera không có thông tin tọa độ.')
                    }
                })
                .catch((error) => {
                    console.error('Lỗi khi tải dữ liệu từ API:', error)
                    alert('Có lỗi xảy ra khi tải dữ liệu từ API.')
                })
        },
        startDrawing(event) {
            if (this.dangerZone.length < 4 && !this.isDrawing) {
                this.isDrawing = true
                const x =
                    (event.clientX - this.canvas.getBoundingClientRect().left) *
                    (this.canvas.width / this.canvas.clientWidth)
                const y =
                    (event.clientY - this.canvas.getBoundingClientRect().top) *
                    (this.canvas.height / this.canvas.clientHeight)
                this.dangerZone.push({ x, y })
                this.drawPoint(x, y)
                this.isConfirmed = false

                if (this.dangerZone.length === 4) {
                    this.confirmDrawing()
                }
            }
        },
        stopDrawing() {
            this.isDrawing = false
        },
        drawPoint(x, y) {
            this.ctx.strokeStyle = 'red'
            this.ctx.lineWidth = 2
            this.ctx.fillStyle = 'rgba(255, 192, 203, 0.5)' // Màu pink với độ mờ (opacity) 0.5
            this.ctx.beginPath()
            this.ctx.arc(x, y, 2, 0, Math.PI * 2)
            this.ctx.closePath()
            this.ctx.fill()
            this.ctx.stroke()
        },
        connectPoints() {
            if (this.dangerZone.length < 2) return
            // Đổi màu sơn khung hình và bên trong khung hình
            this.ctx.strokeStyle = 'red'
            this.ctx.lineWidth = 2
            this.ctx.fillStyle = 'rgba(255, 192, 203, 0.5)' // Màu hồng bên trong
            this.ctx.beginPath()
            this.ctx.moveTo(this.dangerZone[0].x, this.dangerZone[0].y)
            for (let i = 1; i < this.dangerZone.length; i++) {
                this.ctx.lineTo(this.dangerZone[i].x, this.dangerZone[i].y)
            }
            this.ctx.closePath()
            this.ctx.fill() // Sơn màu hồng bên trong
            this.ctx.stroke() // Vẽ khung hình
        },
        clearCanvas() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        },
        roundCoordinates() {
            this.dangerZone = this.dangerZone.map((point) => {
                return {
                    x: Math.round(point.x),
                    y: Math.round(point.y),
                }
            })
        },
        saveCoordinates() {
            if (!this.isConfirmed) {
                alert('Vui lòng xác nhận tọa độ trước khi lưu.')
                return
            }
            this.roundCoordinates()

            // const jsonBlob = new Blob([JSON.stringify(this.dangerZone)], {
            //     type: 'application/json',
            // })
            // const jsonUrl = URL.createObjectURL(jsonBlob)
            // const a = document.createElement('a')
            // a.href = jsonUrl
            // a.download = 'coordinates.json'
            // a.click()
            // URL.revokeObjectURL(jsonUrl)
            // console.log(JSON.stringify(this.dangerZone))

            axios
                .patch(`http://localhost:3011/api/cameras/1`, {
                    coordinates: JSON.stringify(this.dangerZone),
                })
                .then(() => {
                    console.log('Tọa độ đã được cập nhật thành công.')
                    alert('Tọa độ đã được lưu.')
                })
                .catch((error) => {
                    console.error('Lỗi khi cập nhật tọa độ:', error)
                    alert('Có lỗi xảy ra khi cập nhật tọa độ.')
                })
        },

        resetDrawing() {
            this.isDrawing = false
            this.dangerZone = []
            this.clearCanvas()
            this.isConfirmed = false
        },
        redrawCoordinates() {
            this.clearCanvas()
            for (const point of this.dangerZone) {
                this.drawPoint(point.x, point.y)
            }
            this.connectPoints()
        },
        confirmDrawing() {
            if (this.dangerZone.length >= 2 && !this.isConfirmed) {
                this.connectPoints()
                this.isConfirmed = true
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.draw-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden; /* Ẩn phần ngoài khung hình */
    canvas {
        background-image: url('../../assets/img/test-draw.png');
        background-repeat: no-repeat;
        background-size: contain;
        max-width: 100%; /* Không vượt quá kích thước ban đầu */
        max-height: 100%; /* Không vượt quá kích thước ban đầu */
        width: 80%;
        height: 80%;
    }
}
</style>
