import { Card } from "@/components/common/Card";
import { Heading } from "@/components/common/Heading";
import { Highlight } from "@/components/common/Highlight";
import { Paragraph } from "@/components/common/Paragraph";
import { QuoteIcon, StarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Testimonials = () => {
  const t = useTranslations("TestimonialsSection");

  const testimonials = [
    {
      name: t("testimonials.name1"),
      image: "/images/face-1.png",
      position: t("testimonials.position1"),
      description: t("testimonials.description1"),
    },
    {
      name: t("testimonials.name2"),
      image: "/images/face-2.png",
      position: t("testimonials.position2"),
      description: t("testimonials.description2"),
    },
    {
      name: t("testimonials.name3"),
      image: "/images/face-3.png",
      position: t("testimonials.position3"),
      description: t("testimonials.description3"),
    },
  ];

  return (
    <div className="layout space-y-12 py-12">
      <div className="space-y-12 text-center">
        <Heading level="2" className="font-medium">
          {t("title")} <Highlight>{t("title2")}</Highlight>
        </Heading>
        <Paragraph variant="secondary" className="max-w-xl mx-auto">
          {t("description")}
        </Paragraph>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-32 pt-24">
        {testimonials.map((testimonial, testimonialIndex) => (
          <Card
            key={testimonialIndex}
            variant={testimonialIndex % 2 === 0 ? "2" : "1"}
            className="space-y-4 relative pt-20"
          >
            <Image
              src={testimonial.image}
              width={144}
              height={144}
              alt="testimonial"
              className={`rounded-full absolute -top-20 left-1/2 -translate-x-1/2 border-2 p-4 ${
                testimonialIndex % 2 === 0 ? "border-primary" : "border-white"
              }`}
            />
            <div
              className={`space-y-4 text-center ${
                testimonialIndex % 2 === 0 ? "text-white" : "text-black"
              }`}
            >
              <div className="flex justify-center">
                {Array.from({ length: 5 }, (_, index) => (
                  <StarIcon key={index} size={24} fill="currentColor" />
                ))}
              </div>
              <Heading
                level="3"
                className={testimonialIndex % 2 === 0 ? "" : "!text-black"}
              >
                {testimonial.name}
              </Heading>
              <Paragraph
                variant="secondary"
                size="sm"
                className={testimonialIndex % 2 === 0 ? "" : "!text-white"}
              >
                {testimonial.position}
              </Paragraph>
              <QuoteIcon size={32} fill="currentColor" className="mx-auto" />
              <Paragraph
                variant="secondary"
                size="sm"
                className={`italic ${
                  testimonialIndex % 2 === 0 ? "" : "text-white"
                }`}
              >
                {testimonial.description}
              </Paragraph>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export { Testimonials };
