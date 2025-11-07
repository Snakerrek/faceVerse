import { useState } from "react";
import { useRouter } from "expo-router";
import { Gender, RegisterData, ResponseStatus } from "../types/types";
import { register } from "../services/authService";

interface FormData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  dob_day: string;
  dob_month: string;
  dob_year: string;
  gender: Gender;
}

const initialFormData: FormData = {
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  dob_day: "",
  dob_month: "",
  dob_year: "",
  gender: Gender.MALE,
};

const useRegisterForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateRequiredFields = (): boolean => {
    if (
      !formData.email ||
      !formData.password ||
      !formData.first_name ||
      !formData.last_name
    ) {
      setMessage("All the fields are required.");
      setIsError(true);
      return false;
    }
    return true;
  };

  const validateDate = (year: number, month: number, day: number): boolean => {
    if (
      isNaN(year) ||
      isNaN(month) ||
      isNaN(day) ||
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > 31 ||
      year < 1900 ||
      year > new Date().getFullYear()
    ) {
      setMessage("Wrong birthdate");
      setIsError(true);
      return false;
    }
    return true;
  };

  const formatDateOfBirth = (): string | null => {
    if (formData.dob_year && formData.dob_month && formData.dob_day) {
      const year = parseInt(formData.dob_year, 10);
      const month = parseInt(formData.dob_month, 10);
      const day = parseInt(formData.dob_day, 10);

      if (!validateDate(year, month, day)) {
        return null;
      }

      return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    } else if (formData.dob_year || formData.dob_month || formData.dob_day) {
      setMessage("Fill in all the date parts.");
      setIsError(true);
      return null;
    }

    return "";
  };

  const resetMessages = () => {
    setMessage(null);
    setIsError(false);
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleRegister = async () => {
    if (!validateRequiredFields()) {
      return;
    }

    const dateOfBirth = formatDateOfBirth();
    if (dateOfBirth === null) {
      return;
    }

    setIsLoading(true);
    resetMessages();

    const registerData: RegisterData = {
      email: formData.email,
      password: formData.password,
      first_name: formData.first_name,
      last_name: formData.last_name,
      date_of_birth: dateOfBirth,
      gender: formData.gender,
    };

    const registerRes = await register(registerData);

    if (registerRes.status === ResponseStatus.OK) {
      setMessage("Registration went correct, you can log in now.");
      setIsError(false);
      resetForm();
      router.replace("/login");
    } else {
      console.error("Registration Error:", registerRes.message);
      setMessage(registerRes.message || "Error, try again.");
      setIsError(true);
    }

    setIsLoading(false);
  };

  return {
    formData,
    isLoading,
    message,
    isError,
    handleInputChange,
    handleRegister,
  };
};

export default useRegisterForm;
