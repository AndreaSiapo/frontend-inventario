import { useState } from "react";
import axios from "axios";

export default function useForm(initialValues = {}) {
  const [data, setData] = useState(initialValues);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const update = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const post = async (url) => {
    setProcessing(true);
    setErrors({});

    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      const apiErrors =
        error.response?.data?.errors ||
        error.response?.data?.error ||
        error.response?.data?.message;

      if (apiErrors) setErrors(apiErrors);
      throw error;
    } finally {
      setProcessing(false);
    }
  };

  return { data, setData: update, post, processing, errors };
}
