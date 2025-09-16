"use client";
import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  content: string;
}

const Accordion = ({ items }: { items: AccordionProps[] }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [open, setOpen] = useState<number | null>(null);

    return (
        <div>
            {items.map((item, index) => (
            <div 
                key={index}
                style={{
                width: '746px',
                backgroundColor: '#535353',
                marginBottom: '45px',
                }}
            >
                <button 
                onClick={() => setOpen(open === index ? null : index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ 
                    width: '706px', 
                    padding: '16px', 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
                >
                <span style={{ 
                    color: hoveredIndex === index ? '#FBBF24' : 'white', 
                    fontSize: '18px' 
                }}>
                    {item.title}
                </span>
                <span style={{ 
                    color: hoveredIndex === index ? '#FBBF24' : 'white', 
                    fontSize: '24px' 
                }}>
                    {hoveredIndex === index ? '-' : '+'}
                </span>
                </button>
                {open === index && (
                <div style={{ padding: '0 20px 20px', color: '#D1D5DB' }}>
                    {item.content}
                </div>
                )}
            </div>
            ))}
        </div>
        );
    };
    
export default Accordion;