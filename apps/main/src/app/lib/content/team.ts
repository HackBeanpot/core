import type {
  Department,
  Labeled,
  PictureFrameVariant,
  SectionHeading,
  TeamMember,
} from "./types";

export const teamSection: SectionHeading = {
  title: "MEET THE TEAM",
};

export const departments: Labeled<Department>[] = [
  { id: "directors", label: "Directors" },
  { id: "design", label: "Design" },
  { id: "tech", label: "Tech" },
  { id: "sponsorship", label: "Sponsorship" },
  { id: "operations", label: "Operations" },
  { id: "marketing", label: "Marketing" },
];

const departmentFrames: Record<Department, PictureFrameVariant> = {
  directors: "goldBevel",
  design: "blueMedallion",
  tech: "copperRect",
  sponsorship: "wood",
  operations: "greenArch",
  marketing: "navyShield",
};

function member(
  department: Department,
  name: string,
  role: string,
): TeamMember {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z]+/g, "-")
    .replace(/^-|-$/g, "");
  return {
    name,
    role,
    department,
    frame: departmentFrames[department],
    photo: { src: `/team/members/${slug}.webp`, alt: name },
  };
}

// TODO(content): add LinkedIn URLs, double check all details, names, and peoples' preferred level of privacy on the site.
export const team: TeamMember[] = [
  member("directors", "Angie Che", "Co-Director"),
  member("directors", "Susan Chen", "Co-Director"),

  member("design", "Zahra Wibisana", "Design Lead"),
  member("design", "Carolyn Hoa", "Designer"),
  member("design", "Cole Abrams", "Designer"),
  member("design", "Maia Gonzalez", "Designer"),
  member("design", "Lucy Liu", "Designer"),

  member("tech", "Aditya Pathak", "Tech Lead"),
  member("tech", "Andre Coullard", "Developer"),
  member("tech", "Mehana Nagarur", "Developer"),
  member("tech", "Michael Zhang", "Developer"),
  member("tech", "Phaedra Sanon", "Developer"),
  member("tech", "Shreeya A.", "Developer"),
  member("tech", "Yurika Kan", "Developer"),

  member("sponsorship", "Jolin Yang", "Sponsorship Lead"),
  member("sponsorship", "Esha Kanakapura", "Sponsorship"),
  member("sponsorship", "Amogh Athimamula", "Sponsorship"),
  member("sponsorship", "Tanvi Agarwal", "Sponsorship"),
  member("sponsorship", "Gauri Rajesh", "Sponsorship"),
  member("sponsorship", "Seifer Mathias", "Sponsorship"),

  member("operations", "Nicole Ni", "Operations Lead"),
  member("operations", "Lyanne Xu", "Operations"),
  member("operations", "Nicholas Chen", "Operations"),
  member("operations", "Agrima Jain", "Operations"),
  member("operations", "Rithika Ravichandran", "Operations"),

  member("marketing", "Rai Makaraju", "Marketing Lead"),
  member("marketing", "Dalton Burkhart", "Marketing"),
  member("marketing", "Clio Leung", "Marketing"),
  member("marketing", "Shayaan Hussain", "Marketing"),
  member("marketing", "Isabel Yeow", "Marketing"),
  member("marketing", "Camila Carrillo", "Marketing"),
  member("marketing", "Justin Xu", "Marketing"),
];
