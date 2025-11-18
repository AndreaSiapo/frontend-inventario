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
      return response;
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
      throw error;
    } finally {
      setProcessing(false);
    }
  };

  return { data, setData: update, post, processing, errors };
}
