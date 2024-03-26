import { useCreateTicketMutation } from '@/lib/hooks/ticketMutationHooks';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from './ui/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';

const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(500),
});

export default function CreateTicketDialog({ boardId }: { boardId: number }) {
  const createTicketMutation = useCreateTicketMutation(boardId);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {}
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({ title: 'Creating ticket...' });
    createTicketMutation.mutate({ ticket: values });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Ticket</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <DialogHeader>Create Ticket</DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticket Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ticket Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticket Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ticket Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Create</Button>
              <DialogClose asChild>
                <Button variant="destructive">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
