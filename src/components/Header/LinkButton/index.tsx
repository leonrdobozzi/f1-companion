import Link from "next/link";

interface ILinkButton {
  link: string;
  text: string;
}

export default function LinkButton({ link, text }: ILinkButton) {
  return (
    <Link className="text-white underline underline-offset-8" href={`/${link}`}>
      {text}
    </Link>
  );
}
