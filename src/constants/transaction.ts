import {
    Bike,
    Car,
    CircleCheckBig,
    Clock,
    Fuel,
    Package,
    Shield,
    Utensils,
    Wrench,
} from "lucide-react";

export const INCOME_CATEGORIES = [
    { value: "GRAB_BIKE", label: "GrabBike" },
    { value: "GRAB_EXPRESS", label: "Grab Express" },
    { value: "GRAB_CAR", label: "GrabCar" },
    { value: "BE_BIKE", label: "Be Bike" },
    { value: "BE_CAR", label: "Be Car" },
    { value: "XANH_SM", label: "Xanh SM" },
    { value: "OTHER_INCOME", label: "Khác" },
] as const;

export const EXPENSE_CATEGORIES = [
    { value: "FUEL", label: "Xăng xe" },
    { value: "MAINTENANCE", label: "Bảo dưỡng" },
    { value: "INSURANCE", label: "Bảo hiểm" },
    { value: "FOOD", label: "Ăn uống" },
    { value: "OTHER_EXPENSE", label: "Khác" },
] as const;

export const ALL_CATEGORIES = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];

export const CATEGORY_CONFIG = {
    GRAB_BIKE: { icon: Bike, label: "GrabBike" },
    GRAB_EXPRESS: { icon: Package, label: "Grab Express" },
    GRAB_CAR: { icon: Car, label: "GrabCar" },
    BE_BIKE: { icon: Bike, label: "Be Bike" },
    BE_CAR: { icon: Car, label: "Be Car" },
    XANH_SM: { icon: Bike, label: "Xanh SM" },
    OTHER_INCOME: { icon: Package, label: "Khác" },
    FUEL: { icon: Fuel, label: "Xăng xe" },
    MAINTENANCE: { icon: Wrench, label: "Bảo dưỡng" },
    INSURANCE: { icon: Shield, label: "Bảo hiểm" },
    FOOD: { icon: Utensils, label: "Ăn uống" },
    OTHER_EXPENSE: { icon: Package, label: "Khác" },
} as const;

export const STATUS_CONFIG = {
    APPROVED: {
        label: "Đã xác nhận",
        className: "text-main bg-main/10 border-main",
        icon: CircleCheckBig,
        variant: "primary",
    },
    PENDING: {
        label: "Chờ đối soát",
        className: "text-amber-400 bg-amber-400/10 border-amber-400",
        icon: Clock,
        variant: "warning",
    },
} as const;

export const PAYMENTMETHOD_CONFIG = {
    CASH: {
        label: "Tiền mặt",
    },
    E_WALLET: {
        label: "Ví điện tử",
    },
} as const;

// filter
export const TYPE_FILTERS = [
    { id: "all", title: "Tất cả" },
    { id: "INCOME", title: "Thu nhập" },
    { id: "EXPENSE", title: "Chi phí" },
] as const;

export const PAYMENT_METHOD_FILTERS = [
    { id: "all", title: "Tất cả" },
    { id: "CASH", title: "Tiền mặt" },
    { id: "E_WALLET", title: "Ví điện tử" },
] as const;

export const STATUS_FILTERS = [
    { id: "all", title: "Tất cả" },
    { id: "PENDING", title: "Chờ đối soát" },
    { id: "APPROVED", title: "Đã xác nhận" },
] as const;
