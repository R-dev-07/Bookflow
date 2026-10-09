'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useState, ReactNode } from 'react';

interface AccordionItemProps {
  children: ReactNode;
  className?: string;
}

interface AccordionTriggerProps {
  children: ReactNode;
  className?: string;
  isOpen?: boolean;
  onClick?: () => void;
}

interface AccordionContentProps {
  children: ReactNode;
  className?: string;
  isOpen?: boolean;
}

function AccordionItem({ children, className }: AccordionItemProps) {
  return <div className={cn('border-b border-border', className)}>{children}</div>;
}

function AccordionTrigger({ children, className, isOpen, onClick }: AccordionTriggerProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:text-text-primary [&[data-state=open]]:text-text-primary',
        className
      )}
    >
      {children}
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="ml-4 h-4 w-4 shrink-0 text-text-muted transition-transform"
      >
        <path d="m6 9 6 6 6-6" />
      </motion.svg>
    </button>
  );
}

function AccordionContent({ children, className, isOpen }: AccordionContentProps) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className={cn('overflow-hidden', className)}
        >
          <div className="pb-4 pt-0 text-text-muted">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface AccordionProps {
  items: {
    id: string;
    trigger: ReactNode;
    content: ReactNode;
  }[];
  className?: string;
}

function Accordion({ items, className }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className={className}>
      {items.map((item) => (
        <AccordionItem key={item.id}>
          <AccordionTrigger
            isOpen={openItems.has(item.id)}
            onClick={() => toggleItem(item.id)}
          >
            {item.trigger}
          </AccordionTrigger>
          <AccordionContent isOpen={openItems.has(item.id)}>
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </div>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
