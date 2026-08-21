import { Button } from "@/components/ui/button";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDown, Globe2, Landmark, Plane, Send } from "lucide-react";

const suggestions = [
  {
    title: "Create a New Trip",
    icon: <Globe2 className="text-blue-400 h-4 w-4 group-hover:text-white" />,
  },
  {
    title: "Inspire me where to go",
    icon: <Plane className="text-green-500 h-4 w-4 group-hover:text-white" />,
  },
  {
    title: "Discover Hidden gems",
    icon: (
      <Landmark className="text-orange-500 h-4 w-4 group-hover:text-white" />
    ),
  },
  {
    title: "Adventure Destination",
    icon: <Globe2 className="text-yellow-600 h-4 w-4 group-hover:text-white" />,
  },
];

const Hero = () => {
  return (
    <div className="mt-24 w-full flex justify-center px-4">
      {/* Content */}
      <div className="max-w-3xl w-full text-center space-y-6">
        <h1 className="text-xl md:text-5xl font-bold">
          Hey, I&apos;m your personal
          <span className="text-primary"> Trip Planner</span>
        </h1>
        <p className="text-lg">
          Tell me what you want, and I&apos;ll handle the rest: Flights, Hotels, Trip
          Planner - all in seconds
        </p>

        {/* Input Box */}
        <div>
          <div className="border rounded-2xl p-4 relative">
            <Textarea
              placeholder="Create a trip for Paris from New York"
              className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
            />
            <Button size={"icon"} className="absolute bottom-6 right-6">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Suggestion List */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-5">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="group flex items-center gap-2 border rounded-full p-2 cursor-pointer hover:bg-primary hover:text-white"
            >
              {suggestion.icon}
              <h2 className="text-sm">{suggestion.title}</h2>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center flex-col">
          <h2 className="my-7 mt-14 flex gap-2 text-center">
            Not Sure where to start? <strong>See how it works</strong>
            <ArrowDown />
          </h2>
          {/* Video Section */}
          <HeroVideoDialog
            className="block dark:hidden"
            animationStyle="from-center"
            videoSrc="https://www.example.com/dummy-video"
            thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
            thumbnailAlt="Dummy Video Thumbnail"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
