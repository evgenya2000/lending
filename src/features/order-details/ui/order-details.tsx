'use client';

import { Order } from '@/shared/model/types';
import styles from './order-details.module.css';
import { handleCopy } from '@/shared/lib/helps/handleCopy';
import { useState } from 'react';

export const OrderDetails = ({ order }: { order: Order }) => {
    const [isCopied, setIsCopied] = useState(false);
    if (!order) return null;

    const totalSum = order.items.reduce(
        (sum, item) => sum + item.quantity * Number(item.price),
        0
    );

    const totalQuantity = order.items.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

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
                        onClick={(e) => handleCopy(e, order.deliveryAddress || '—', setIsCopied)}
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
                        onClick={(e) => handleCopy(e, order.fullName, setIsCopied)}
                        title="Нажмите, чтобы скопировать"
                    >
                        {order.fullName}
                    </div>
                </div>

                <div className={styles["info-row"]}>
                    <div className={styles["info-label"]}>Номер телефона:</div>
                    <div className={`${styles["info-value"]} ${styles["copyable"]}`}
                        onClick={(e) => handleCopy(e, order.phone, setIsCopied)}
                        title="Нажмите, чтобы скопировать">{order.phone}</div>
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
                                    onClick={(e) => handleCopy(e, item.price.toString(), setIsCopied)}
                                    title="Нажмите, чтобы скопировать название товара">{item.product.title}</td>
                                <td>{item.quantity}</td>
                                <td
                                    className={styles["copyable"]}
                                    onClick={(e) => handleCopy(e, item.price.toString(), setIsCopied)}
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
                        <td className={styles["summer"]}>Итого:</td>
                        <td className={`${styles["summer-number"]}`}>{totalQuantity}</td>
                        <td
                            className={`${styles["summer-number"]} ${styles["copyable"]}`}
                            onClick={(e) => handleCopy(e, totalSum.toString(), setIsCopied)}
                            title="Нажмите, чтобы скопировать итоговую сумму"
                        >
                            {totalSum} ₽
                        </td>
                    </tr>
                </tfoot>
            </table>
            <span className={`${styles["copy-message"]} ${isCopied ? styles["visible"] : ""}`}>Текст скопирован</span>
        </div>
    );
};