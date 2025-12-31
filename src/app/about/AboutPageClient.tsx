'use client';

import { Container, Section, Heading, Text, AccentLine, Grid } from '@/components/ui';
import { FadeIn, StatCounter } from '@/components/motion';
import { groupProfile, companyStats as defaultStats } from '@/lib/mock-data';
import type { CoreValue, CompanyStat } from '@/types';

interface AboutPageClientProps {
  vision?: string;
  mission?: string;
  philosophy?: string;
  companyStory?: string;
  coreValues?: CoreValue[];
  companyStats?: CompanyStat[];
  foundingYear?: number;
}

// Default values
const defaultValues: CoreValue[] = [
  {
    title: 'Integrity',
    description: 'We conduct business with honesty and transparency, building trust with every interaction.',
  },
  {
    title: 'Excellence',
    description: 'We pursue the highest standards in everything we do, never settling for mediocrity.',
  },
  {
    title: 'Community',
    description: 'We invest in the communities where we operate, understanding that their success is our success.',
  },
  {
    title: 'Innovation',
    description: 'We embrace new ideas and technologies that help us serve our stakeholders better.',
  },
  {
    title: 'Sustainability',
    description: 'We build for generations, considering the long-term impact of every decision.',
  },
  {
    title: 'Partnership',
    description: 'We believe in collaborative relationships that create mutual value for all parties.',
  },
];

export default function AboutPageClient({
  vision,
  mission,
  companyStory,
  coreValues,
  companyStats,
  foundingYear = 2008,
}: AboutPageClientProps) {
  // Use CMS data or fall back to defaults
  const displayVision = vision || groupProfile.vision;
  const displayMission = mission || groupProfile.mission;
  const displayValues = coreValues && coreValues.length > 0 ? coreValues : defaultValues;
  const displayStats = companyStats && companyStats.length > 0 ? companyStats : defaultStats;

  // Calculate years since founding
  const yearsOperating = new Date().getFullYear() - foundingYear;

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-earth-anchor">
        <Container>
          <FadeIn>
            <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
              About Us
            </Text>
            <AccentLine size="lg" className="mb-8" />
          </FadeIn>

          <FadeIn delay={0.2}>
            <Heading as="h1" size="display-lg" color="white" className="max-w-4xl">
              Building Ethiopia&apos;s Tomorrow Since {foundingYear}
            </Heading>
          </FadeIn>

          <FadeIn delay={0.4}>
            <Text size="lg" color="white" className="mt-6 max-w-2xl opacity-80">
              A diversified enterprise creating lasting value for communities and partners across East Africa.
            </Text>
          </FadeIn>
        </Container>
      </section>

      {/* Stats Bar */}
      <Section size="sm" background="neutral">
        <Grid cols={4} gap="lg">
          {displayStats.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 0.1}>
              <StatCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                size="md"
              />
            </FadeIn>
          ))}
        </Grid>
      </Section>

      {/* Story Section */}
      <Section size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <FadeIn>
              <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
                Our Story
              </Text>
              <AccentLine size="md" />
            </FadeIn>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {companyStory ? (
              <FadeIn delay={0.1}>
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: companyStory }}
                />
              </FadeIn>
            ) : (
              <>
                <FadeIn delay={0.1}>
                  <Text size="lg" className="mb-6">
                    Founded in {foundingYear} in Addis Ababa, ZG Business Group began as a modest import and export enterprise with a clear vision: to build a business that would create lasting value for Ethiopia and its people.
                  </Text>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <Text size="lg" className="mb-6 text-neutral-600">
                    Over the past {yearsOperating} years, we have methodically expanded into sectors that serve fundamental human needs—food, shelter, employment, hospitality, and community development. Each expansion has been guided by the same principles that defined our beginning: operational excellence, ethical practices, and long-term commitment to the communities we serve.
                  </Text>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <Text size="lg" weight="semibold" className="text-highland-gold">
                    Today, ZG Business Group operates across 10 industries with over 5,000 employees, contributing to Ethiopia&apos;s economic growth while maintaining our founding commitment to quality and integrity.
                  </Text>
                </FadeIn>
              </>
            )}
          </div>
        </div>
      </Section>

      {/* Values Section */}
      <Section size="lg" background="earth">
        <FadeIn>
          <div className="text-center mb-16">
            <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
              Our Values
            </Text>
            <Heading as="h2" size="h2" color="white">
              What Guides Us
            </Heading>
          </div>
        </FadeIn>

        <Grid cols={3} gap="lg">
          {displayValues.map((value, index) => (
            <FadeIn key={value.title} delay={index * 0.1}>
              <div className="p-6 border border-paper-white/10 rounded-lg hover:border-highland-gold/30 transition-colors duration-300">
                <Heading as="h3" size="h4" color="gold" className="mb-3">
                  {value.title}
                </Heading>
                <Text size="sm" color="white" className="opacity-70">
                  {value.description}
                </Text>
              </div>
            </FadeIn>
          ))}
        </Grid>
      </Section>

      {/* Vision & Mission */}
      <Section size="lg">
        <Grid cols={2} gap="xl">
          <FadeIn>
            <div className="p-8 bg-neutral-50 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
                Our Vision
              </Text>
              <Text size="lg">
                {displayVision}
              </Text>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="p-8 bg-neutral-50 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
                Our Mission
              </Text>
              <Text size="lg">
                {displayMission}
              </Text>
            </div>
          </FadeIn>
        </Grid>
      </Section>
    </>
  );
}
