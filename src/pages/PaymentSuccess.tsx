import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-8 text-center">
    <CheckCircle className="h-20 w-20 text-success" />
    <h1 className="text-3xl font-bold text-foreground">Оплата прошла успешно!</h1>
    <p className="max-w-md text-muted-foreground">
      Спасибо за покупку. Мы отправим вам подтверждение на email.
    </p>
    <Link
      to="/"
      className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
    >
      Вернуться в магазин
    </Link>
  </div>
);

export default PaymentSuccess;
