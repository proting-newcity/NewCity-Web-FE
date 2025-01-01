import { defineStore } from "pinia";
import axios from "axios";

export const useLaporanStore = defineStore("laporan", {
    state: () => ({
        laporan: null,
        error: null,
    }),

    getters: {
        report: (state) => state.laporan,
        errors: (state) => state.error,
    },

    actions: {
        async getLaporan() {
            try {
                const response = await axios.get(`/api/report/admin`);
                return response;
            } catch (error) {
                console.error("Error fetching laporan:", error);
                throw error;
            }
        },

        async updateStatusLaporan(data, id) {
            try {
                const response = await axios.post(`/api/report/status/${id}`, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                return response;
            } catch (error) {
                console.error("Error fetching report:", error);
                throw error;
            }
        },
    },
});
