import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { TProject, ProjectFormSchema } from "@/lib/schema";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { RingLoader } from "react-spinners";
import { useUpdateProject } from "@/lib/actions";
interface IUpdateProjectForm {
  onClose: () => void;
  project: {
    avatar: string;
    created_at: string;
    email: string;
    id: number;
    name: string;
    price: number;
    projectType: string;
    status: string;
  };
}
function UpdateProjectForm({ onClose, project }: IUpdateProjectForm) {
  const { projectType, price, name, email, avatar } = project;
  const { updateProject, isPending } = useUpdateProject();
  const form = useForm<TProject>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      projectType: projectType,
      price: price,
      name: name,
      email: email,
      avatar: "/" + avatar,
    },
  });
  const { reset } = form;
  function onSubmit(formValues: TProject) {
    const updatedProjectData = {
      ...formValues,
      avatar: formValues.avatar.slice(1),
    };
    updateProject(
      { projectId: project.id, updatedProjectData },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
        onError: () => {
          reset();
          onClose();
        },
      }
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="projectType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select project type</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Project types</SelectLabel>
                      <SelectItem value="web_page">Web Page</SelectItem>
                      <SelectItem value="store">Store</SelectItem>
                      <SelectItem value="application">Application</SelectItem>
                      <SelectItem value="integration">Integration</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Netto price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Netto price"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company name</FormLabel>
              <FormControl>
                <Input placeholder="Name of company" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="joe@doe.com" type="email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <div className="flex justify-between">
                    <div className="flex flex-col-reverse  items-center gap-3">
                      <RadioGroupItem value="/avataaars.svg" id="avatar1" />
                      <Label className="cursor-pointer" htmlFor="avatar1">
                        <Avatar>
                          <AvatarImage src="/avataaars.svg" alt="avatar" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </Label>
                    </div>
                    <div className="flex flex-col-reverse  items-center gap-3">
                      <RadioGroupItem value="/avataaars1.svg" id="avatar2" />
                      <Label className="cursor-pointer" htmlFor="avatar2">
                        <Avatar>
                          <AvatarImage src="/avataaars1.svg" alt="avatar" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </Label>
                    </div>
                    <div className="flex flex-col-reverse  items-center gap-3">
                      <RadioGroupItem value="/avataaars2.svg" id="avatar3" />
                      <Label className="cursor-pointer" htmlFor="avatar3">
                        <Avatar>
                          <AvatarImage src="/avataaars2.svg" alt="avatar" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-right pt-2">
          <Button type="submit">
            <div className="w-[80px] flex justify-center items-center">
              {isPending ? (
                <RingLoader
                  className="h-10 px-4 py-2  "
                  size={24}
                  color="#111111"
                />
              ) : (
                "Submit"
              )}
            </div>
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default UpdateProjectForm;
