'use client';

import { Order } from '@/shared/model/types';
import styles from './order-details.module.css';

export const OrderDetails = ({ order }: { order: Order }) => {
    if (!order) return null;

    const total = order.items.reduce(
        (sum, item) => sum + item.quantity * Number(item.price),
        0
    );

    // Функция копирования текста в буфер обмена
    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            // Можно добавить небольшую визуальную индикацию, например, alert
            // alert('Скопировано: ' + text);
        } catch (err) {
            console.error('Ошибка копирования:', err);
        }
    };

    return (
        <div className={styles["container"]}>
            <h3>Детали заказа №{order.id}</h3>
            <div className={styles["info"]}>
                <div className={styles["info-row"]}>
                    <div className={styles["info-label"]}>Статус:</div>
                    <div className={styles["info-value"]}>{order.status === "PENDING" ? "Ожидает" : order.status === "ASSEMBLED" ? "Собран" : "-"}</div>
                </div>

                <div className={styles["info-row"]}>
                    <div className={styles["info-label"]}>Дата создания:</div>
                    <div className={styles["info-value"]}>{new Date(order.createdAt).toLocaleString('ru-RU')}</div>
                </div>

                <div className={styles["info-row"]}>
                    <div className={styles["info-label"]}>Дата выдачи:</div>
                    <div className={styles["info-value"]}>{order.issuedAt ? new Date(order.issuedAt).toLocaleString('ru-RU') : '—'}</div>
                </div>

                <div className={styles["info-row"]}>
                    <div className={styles["info-label"]}>Адрес доставки:</div>
                    <div
                        className={`${styles["info-value"]} ${styles["copyable"]}`}
                        onClick={() => handleCopy(order.deliveryAddress || '—')}
                        title="Нажмите, чтобы скопировать"
                    >
                        {order.deliveryAddress || '—'}
                    </div>
                </div>

                <div className={styles["info-row"]}>
                    <div className={styles["info-label"]}>Способ доставки:</div>
                    <div className={styles["info-value"]}>{order.deliveryMethod === 'courier' ? 'Курьер' : 'Почта'}</div>
                </div>

                <div className={styles["info-row"]}>
                    <div className={styles["info-label"]}>Имя заказчика:</div>
                    <div
                        className={`${styles["info-value"]} ${styles["copyable"]}`}
                        onClick={() => handleCopy(order.fullName)}
                        title="Нажмите, чтобы скопировать"
                    >
                        {order.fullName}
                    </div>
                </div>

                <div className={styles["info-row"]}>
                    <div className={styles["info-label"]}>Номер телефона:</div>
                    <div className={styles["info-value"]}>{order.phone}</div>
                </div>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Количество</th>
                        <th>Цена</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td className={styles["copyable"]}
                                    onClick={() => handleCopy(item.price.toString())}
                                    title="Нажмите, чтобы скопировать название товара">{item.product.title}</td>
                                <td>{item.quantity}</td>
                                <td
                                    className={styles["copyable"]}
                                    onClick={() => handleCopy(item.price.toString())}
                                    title="Нажмите, чтобы скопировать цену"
                                >
                                    {item.price} ₽
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td className={styles["summer"]} colSpan={2}>Итого:</td>
                        <td
                            className={`${styles["summer-number"]} ${styles["copyable"]}`}
                            onClick={() => handleCopy(total.toString())}
                            title="Нажмите, чтобы скопировать итоговую сумму"
                        >
                            {total} ₽
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};