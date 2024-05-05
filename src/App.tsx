'use client';

import { Github, Link, Linkedin } from "lucide-react";
import { Button } from "./components/ui/button";

import projectCollection from "@/data/projects.json";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Badge } from "./components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Label } from "./components/ui/label";
import { Separator } from "./components/ui/separator";
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { useState, useEffect } from "react";

type Project = {
  title: string;
  description: string;
  tags: Array<string>;
    contents: Array<{
      label: string;
      name: string;
      url: string;
      img: string;
    }>;
}

type ProjectCollection = {
  projects: Project[];
};

export function App() {
  const { projects: allProjects } = projectCollection as ProjectCollection;

  const [projects, setProjects] = useState<Project[]>(allProjects);
  const [tags, setTags] = useState<Option[]>([]);

  const allTags: Array<string> = [];
  projects.forEach((project) => {
    project.tags.forEach((tag) => {
      if(!allTags.includes(tag)) {
        allTags.push(tag);
      }
    })
  });

  useEffect(() => {
    if(tags.length === 0) {
      setProjects(allProjects);
    } else {
      setProjects(() => allProjects.filter((project) => {
        for(const tag of tags) {
          if(project.tags.includes(tag.value)) {
            return true;
          }
        }
        return false;
      }))
    }
  }, [setProjects, tags, allProjects])

  return (
    <div className="flex flex-col h-screen items-center">
      <div className="w-full px-4 mt-4 max-w-96 flex flex-col h-screen justify-between">
        <header className="flex items-center justify-between py-4 gap-4 mb-8">
          <h2 className="text-xl underline decoration-wavy decoration-primary">
            Github Link Repository
          </h2>
          <Button className="p-2 hover:bg-zinc-600" asChild>
            <a
              href="https://github.com/Matheus1714/github-link-repository"
              target="_blank"
            >
              <Github />
            </a>
          </Button>
        </header>
        <main className="mb-auto">
          <div className="w-full">
            <MultipleSelector
              value={tags}
              onChange={setTags}
              selectFirstItem={false}
              defaultOptions={allTags.map((tag) => ({ value: tag, label: tag }))}
              placeholder="Select a tag"
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-zinc-600 dark:text-zinc-400">
                  No results
                </p>
              }
            />
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col gap-4">
            {projects.map((project) => (
              <Dialog key={project.title}>
                <DialogTrigger asChild className="w-full">
                  <Button variant="default" className="hover:bg-secondary">{project.title}</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{project.title}</DialogTitle>
                    <DialogDescription>{project.description}</DialogDescription>
                  </DialogHeader>
                  <div className="flex gap-3">
                    {project.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                  <Separator />
                  {project.contents.map((content) => (
                    <div className="flex flex-col gap-3" key={content.name}>
                      <Label>{content.label}</Label>
                      <div className="flex justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={content.img} alt="" />
                            <AvatarFallback>
                              {content.name[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <p className="text-xl">{content.name}</p>
                        </div>
                        <div className="bg-zinc-800 hover:bg-zinc-600 p-2 rounded-full">
                          <a href={content.url} target="_blanck">
                            <Link />
                          </a>
                        </div>
                      </div>
                      <Separator />
                    </div>
                  ))}
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </main>
        <footer className="flex flex-col items-center justify-center p-4 gap-4">
          <Separator />
          <p>Contacts</p>
          <div className="flex gap-4">
            <a href="https://github.com/matheus1714" target="_blanck" className="rounded-full">
              <div className="bg-primary hover:bg-zinc-800 p-4 rounded-full">
                <Github />
              </div>
            </a>
            <a href="https://www.linkedin.com/in/matheus-mota-44b21a17b/" target="_blanck" className="rounded-full">
              <div className="bg-primary hover:bg-zinc-800 p-4 rounded-full">
                <Linkedin />
              </div>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
