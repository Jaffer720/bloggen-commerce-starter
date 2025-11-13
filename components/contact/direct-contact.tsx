'use client';

import { Button } from '@/components/ui/button';
import { FaPhone, FaWhatsapp } from 'react-icons/fa';
import React from 'react';

// Small wrapper to match the card look used on the contact page
const ContentWrapper = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div
        className={`from-canvas-bg via-canvas-subtle to-canvas-bg border-canvas-line overflow-hidden rounded-xl border bg-gradient-to-bl from-0% via-50% to-100% shadow-sm ${className}`}>
        {children}
    </div>
);

type DirectContactProps = {
    phoneHref: string;
    whatsappHref: string;
    emailHref?: string;
};

export default function DirectContact({ phoneHref, whatsappHref, emailHref = 'mailto:silverthreadlabs@gmail.com' }: DirectContactProps) {
    return (
        <section aria-label='Direct contact options' className='mx-auto mt-8 max-w-2xl'>
            <ContentWrapper className='p-6'>
                <div className='mb-4 text-center'>
                    <h3 className='text-canvas-text-contrast text-xl font-semibold'>Prefer direct contact?</h3>
                    <p className='text-canvas-text mt-1 text-sm'>Reach us instantly via phone or WhatsApp.</p>
                </div>

                <div className='flex flex-col gap-3 sm:flex-row'>
                    <a href={phoneHref} rel='noopener noreferrer' className='flex-1'>
                        <Button color='primary' variant='surface' fullWidth leadingIcon={<FaPhone />}> 
                            Call us
                        </Button>
                    </a>
                    <a href={whatsappHref} target='_blank' rel='noopener noreferrer' className='flex-1'>
                        <Button color='primary' variant='soft' fullWidth leadingIcon={<FaWhatsapp />}> 
                            WhatsApp
                        </Button>
                    </a>
                </div>

                <p className='text-canvas-text mt-4 text-center text-sm'>
                    Prefer email?{' '}
                    <a className='text-canvas-text-contrast font-medium underline' href={emailHref}>
                        silverthreadlabs@gmail.com
                    </a>
                </p>
            </ContentWrapper>
        </section>
    );
}
