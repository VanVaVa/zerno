import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/shared/lib/firebase";
import { useRouter } from "next/navigation";

interface UseLoginReturn {
  login: (email: string, password: string) => Promise<boolean>;
  loading: boolean;
  error: string;
}

export function useLogin(): UseLoginReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
      return true;
    } catch (error) {
      const errorMessage = getErrorMessage((error as { code: string }).code);
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}

function getErrorMessage(errorCode: string): string {
  const errors: Record<string, string> = {
    "auth/invalid-email": "Неверный формат email",
    "auth/user-disabled": "Пользователь заблокирован",
    "auth/user-not-found": "Пользователь не найден",
    "auth/wrong-password": "Неверный пароль",
    "auth/too-many-requests": "Слишком много попыток. Попробуйте позже",
  };
  return errors[errorCode] || "Произошла ошибка при входе";
}
