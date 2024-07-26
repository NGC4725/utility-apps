"use client";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export interface IAppCardProps {
  title: string;
  description: string;
  route: string;
  image: string;
}

export const AppCard = (props: IAppCardProps) => {
  const { title, description, route, image } = props;
  const router = useRouter();

  const handleClick = () => {
    router.push(route);
  };

  return (
    <Card isPressable onPress={handleClick}>
      <CardHeader className="justify-between">
        <h1 className="text-large font-bold leading-none text-default-600">
          {title}
        </h1>
      </CardHeader>
      <CardBody>
        <Image alt={title} src={image} />
      </CardBody>
      <CardFooter>
        <p>{description}</p>
      </CardFooter>
    </Card>
  );
};
