import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";

const TextCard = ({
  title,
  children,
  odd,
}: {
  title: string;
  children: React.ReactNode;
  odd?: boolean;
}) => {
  return (
    <div className={`w-full flex ${odd ? "justify-end" : "justify-start"}`}>
      <div
        className={`w-[90%] flex flex-col gap-4 rounded-lg bg-secondaryDark/50 p-6 ${
          odd ? "text-right" : ""
        }`}
      >
        <Heading level="3" className="!text-primary">
          {title}
        </Heading>
        <Paragraph variant="primary">{children}</Paragraph>
      </div>
    </div>
  );
};

export { TextCard };
