import { useState } from "react";
import { Telegram } from "@/shared/icons/tg";
import { Vk } from "@/shared/icons/vk";
import { Mail } from "@/shared/icons/mail";
import { Git } from "@/shared/icons/git";
import { handleCopy } from "@/shared/lib/helps/handleCopy";
import { CopyMessage } from "@/shared/ui/copy-message/copy-message";
import { StyledFooter, StyledWrapperIcons } from "./footer.styles";

const EMAIL = "evgenya@yandex.ru";

export const Footer = () => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <StyledFooter>
      <p>Дизайн и разработка: Лукьянова Евгения</p>
      <StyledWrapperIcons>
        <CopyMessage $visible={isCopied}>
          {"Почта скопирована"}
        </CopyMessage>
        <a href="https://t.me/@evgenia_veg"><Telegram /></a>
        <a href="https://vk.ru/id61396007"><Vk /></a>
        <a href={`mailto:${EMAIL}`} onClick={(e) => { handleCopy<HTMLAnchorElement>(e, EMAIL, setIsCopied) }} title="Кликните, чтобы скопировать почту">
          <Mail />
        </a>
        <a href="https://github.com/evgenya2000"><Git /></a>
      </StyledWrapperIcons>

      <p>Сделано с позитивным настроением</p>
    </StyledFooter>
  );
};
