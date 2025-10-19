"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsFillHouseDoorFill } from "react-icons/bs";

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean); // remove empty parts

  // Build breadcrumb links
  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = decodeURIComponent(segment)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize words

    return { href, label };
  });

  return (
    <nav className="text-sm text-gray-600 pl-2">
      <ul className="flex flex-wrap items-center space-x-2">
        <li>
          <Link href="/" className="hover:underline text-brand text-lg font-bold">
            <BsFillHouseDoorFill/>
          </Link>
        </li>
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center">
            <span className="mx-1 text-gray-400">/</span>
            {index === breadcrumbs.length - 1 ? (
              <span className="text-gray-800 font-semibold">{crumb.label}</span>
            ) : (
              <Link
                href={crumb.href}
                className="hover:underline text-brand"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
