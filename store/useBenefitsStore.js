import { create } from "zustand";
import axios from "axios";

const useBenefitsStore = create((set) => ({
  benefits: [],
  loading: false,
  error: null,

  fetchBenefits: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/api/benefits");
      set({ benefits: res.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useBenefitsStore;
