import {
  Code2,
  FileText,
  Megaphone,
  PenTool,
  Search,
  Sparkles,
} from "lucide-react";

const icons = {
  megaphone: Megaphone,
  code: Code2,
  pen: PenTool,
  search: Search,
  file: FileText,
  sparkles: Sparkles,
};

export default function ServiceIcon({ name, ...props }) {
  const Icon = icons[name] || Sparkles;
  return <Icon {...props} />;
}
