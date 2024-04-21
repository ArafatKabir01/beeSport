import Breadcrumb from "@/components/ui/breadcrumb";
import { Title } from "@/components/ui/text";
import cn from "@/utils/class-names";
import Link from "next/link";
import { HiPlus } from "react-icons/hi";
import { Button } from "rizzui";

export type PageHeaderTypes = {
  title: string;
  breadcrumb: { name: string; href?: string }[];
  className?: string;
  href?: string;
  isLinkBtn: boolean;
  isLinkBtnText?: string;
};

export default function PageHeader({
  title,
  breadcrumb,
  children,
  className,
  href,
  isLinkBtn,
  isLinkBtnText
}: React.PropsWithChildren<PageHeaderTypes>) {
  return (
    <header className={cn("mb-6 @container xs:-mt-2 lg:mb-7", className)}>
      <div className='flex flex-col @lg:flex-row @lg:items-center @lg:justify-between'>
        <div>
          <Title as='h2' className='mb-2 text-[22px] lg:text-2xl 4xl:text-[26px]'>
            {title}
          </Title>

          <Breadcrumb separator='' separatorVariant='circle' className='flex-wrap'>
            {breadcrumb.map((item) => (
              <Breadcrumb.Item key={item.name} {...(item?.href && { href: item?.href })}>
                {item.name}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </div>
        {children}
        {isLinkBtn && (
          <Link href={href || "#"}>
            <Button size='sm'>
              <HiPlus className='text-lg' /> {isLinkBtnText}
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
