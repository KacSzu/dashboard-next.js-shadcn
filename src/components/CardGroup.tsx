"use client";

import { LuBarChart4, LuBriefcase, LuDollarSign } from "react-icons/lu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

function CardGroup() {
  const CARD_GROUP = [
    {
      title: "Total orders",
      description: "total",
      content: "123",
      icon: <LuBriefcase className="w-6 h-6" />,
    },
    {
      title: "Total earned",
      description: "total",
      content: "124.281",
      icon: <LuDollarSign className="w-6 h-6" />,
    },
    {
      title: "Active projects",
      description: "total",
      content: "442",
      icon: <LuBarChart4 className="w-6 h-6" />,
    },
    {
      title: "Total orders",
      description: "total",
      content: "424",
      icon: <LuBriefcase className="w-6 h-6" />,
    },
  ];

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="flex gap-2">
        {CARD_GROUP.map(({ title, description, content, icon }) => (
          <Card key={title} className="w-[250px]">
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between">
                  <span>{title}</span>
                </div>
              </CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-primary text-2xl">{content}</span>
                <div className="bg-primary text-white py-3 px-3 rounded-full">
                  {icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default CardGroup;
