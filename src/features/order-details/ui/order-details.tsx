'use client';

import { Order } from '@/shared/model/types';
import {
    StyledContainer,
    StyledCopyable,
    StyledCopyableCell,
    StyledCopyMessage,
    StyledInfo,
    StyledInfoLabel,
    StyledInfoRow,
    StyledInfoValue,
    StyledTable,
} from './order-details.styles';
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
        <StyledContainer>
            <h3>Детали заказа №{order.id}</h3>
            <StyledInfo>
                <StyledInfoRow>
                    <StyledInfoLabel>Статус:</StyledInfoLabel>
                    <StyledInfoValue>{order.status === "PENDING" ? "Ожидает" : order.status === "ASSEMBLED" ? "Собран" : "-"}</StyledInfoValue>
                </StyledInfoRow>

                <StyledInfoRow>
                    <StyledInfoLabel>Дата создания:</StyledInfoLabel>
                    <StyledInfoValue>{new Date(order.createdAt).toLocaleString('ru-RU')}</StyledInfoValue>
                </StyledInfoRow>

                <StyledInfoRow>
                    <StyledInfoLabel>Дата выдачи:</StyledInfoLabel>
                    <StyledInfoValue>{order.issuedAt ? new Date(order.issuedAt).toLocaleString('ru-RU') : '—'}</StyledInfoValue>
                </StyledInfoRow>

                <StyledInfoRow>
                    <StyledInfoLabel>Адрес доставки:</StyledInfoLabel>
                    <StyledCopyable
                        onClick={(e) => handleCopy(e, order.deliveryAddress || '—', setIsCopied)}
                        title="Нажмите, чтобы скопировать"
                    >
                        {order.deliveryAddress || '—'}
                    </StyledCopyable>
                </StyledInfoRow>

                <StyledInfoRow>
                    <StyledInfoLabel>Способ доставки:</StyledInfoLabel>
                    <StyledInfoValue>{order.deliveryMethod === 'courier' ? 'Курьер' : 'Почта'}</StyledInfoValue>
                </StyledInfoRow>

                <StyledInfoRow>
                    <StyledInfoLabel>Имя заказчика:</StyledInfoLabel>
                    <StyledCopyable
                        onClick={(e) => handleCopy(e, order.fullName, setIsCopied)}
                        title="Нажмите, чтобы скопировать"
                    >
                        {order.fullName}
                    </StyledCopyable>
                </StyledInfoRow>

                <StyledInfoRow>
                    <StyledInfoLabel>Номер телефона:</StyledInfoLabel>
                    <StyledCopyable
                        onClick={(e) => handleCopy(e, order.phone, setIsCopied)}
                        title="Нажмите, чтобы скопировать"
                    >
                        {order.phone}
                    </StyledCopyable>
                </StyledInfoRow>
            </StyledInfo>
            <StyledTable>
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
                                <StyledCopyableCell
                                    onClick={(e) => handleCopy(e, item.price.toString(), setIsCopied)}
                                    title="Нажмите, чтобы скопировать название товара">{item.product.title}</StyledCopyableCell>
                                <td>{item.quantity}</td>
                                <StyledCopyableCell
                                    onClick={(e) => handleCopy(e, item.price.toString(), setIsCopied)}
                                    title="Нажмите, чтобы скопировать цену"
                                >
                                    {item.price} ₽
                                </StyledCopyableCell>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td>Итого:</td>
                        <td>{totalQuantity}</td>
                        <StyledCopyableCell
                            onClick={(e) => handleCopy(e, totalSum.toString(), setIsCopied)}
                            title="Нажмите, чтобы скопировать итоговую сумму"
                        >
                            {totalSum} ₽
                        </StyledCopyableCell>
                    </tr>
                </tfoot>
            </StyledTable>
            <StyledCopyMessage $visible={isCopied}>Текст скопирован</StyledCopyMessage>
        </StyledContainer>
    );
};
