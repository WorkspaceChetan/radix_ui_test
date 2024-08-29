"use client";

import { TimeZone, StartTime, EndTime } from "@/constants/event.contant";
import {
  ClockIcon,
  Cross1Icon,
  GlobeIcon,
  InfoCircledIcon,
  Link2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Callout,
  Flex,
  Grid,
  Select,
  Skeleton,
  Spinner,
  Text,
  TextArea,
  TextField,
  useThemeContext,
} from "@radix-ui/themes";
import { Formik } from "formik";
import { ChangeEvent, useRef, useState } from "react";
import * as yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import { AlertDialogModal } from "@/component/UIComponets/Dialog";
import "./index.style.css";
import { EventService } from "@/libs/event";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

export type FileObject = {
  name: string;
  size: number;
  url: string;
};

const DashboardPageView = () => {
  const { appearance } = useThemeContext();
  const isDark = appearance === "dark";

  const inputFile = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<FileObject | string>("");
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = yup.object({
    eventName: yup.string().required("Event name is required"),
    date: yup.string().required("Date is required"),
    timezone: yup.string().required("Timezone is required"),
    startTime: yup.string().required("StartTime is required"),
    endTime: yup.string().required("EndTime is required"),
    description: yup
      .string()
      .min(15, "Description must be at least 15 characters long")
      .required("Description is required"),
    video: yup
      .string()
      .url("Video must be a valid URL starting with https")
      .required("Video is required"),
    bannerImage: yup.string().required("BannerImage is required"),
  });

  const removeImage = () => {
    setImages("");
  };

  const handleImageUpload = (file: File) => {
    const fileobject = {
      name: file.name,
      size: Math.round(file.size / 1024),
      url: URL.createObjectURL(file),
    };
    setImages(fileobject);
  };

  const onButtonClick = () => {
    if (inputFile && inputFile.current) {
      inputFile.current.click();
    }
  };

  return (
    <Box style={{ width: "100%", maxWidth: "570px" }}>
      <Formik
        initialValues={{
          eventName: "",
          date: null,
          timezone: "",
          startTime: "",
          endTime: "",
          description: "",
          video: "",
          bannerImage: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setIsLoading(true);
          await EventService.createEvent(values);
          setIsLoading(false);
          toast.custom((t) => (
            <Box position="relative">
              <Image src="/glitter.gif" alt="gif" width="260" height="260" />
              <Box
                width="380px"
                style={{
                  border: `1px solid ${isDark ? "#F4FAED2C" : "#00140028"}`,
                  borderRadius: "6px",
                  zIndex: 1000000,
                  position: "absolute",
                  right: "0%",
                  top: "40%",
                }}
                p="2"
              >
                <Flex align="center" justify="between">
                  <Text style={{ color: isDark ? "#FFF" : "#000" }} size="2">
                    Event created on{" "}
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    !
                  </Text>
                  <Flex align="center" gap="2">
                    <Text color="grass" size="1">
                      <Link href="#">Edit Event</Link>
                    </Text>
                    <Cross1Icon
                      style={{
                        color: isDark ? "#FFF" : "#000",
                        width: "10px",
                        height: "10px",
                      }}
                      onClick={() => toast.dismiss(t.id)}
                    />
                  </Flex>
                </Flex>
              </Box>
            </Box>
          ));
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          setFieldValue,
          submitCount,
          resetForm,
        }) => {
          const errorMessage = submitCount > 0 ? Object.values(errors)[0] : "";
          const handleDelete = () => {
            resetForm();
            setImages("");
          };
          return (
            <form onSubmit={handleSubmit}>
              <Flex direction="column" gap="8">
                {errorMessage && (
                  <Callout.Root color="red">
                    <Callout.Icon>
                      <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>{errorMessage as string}</Callout.Text>
                  </Callout.Root>
                )}
                <Flex gap="3" direction={"column"}>
                  <Text size="6">
                    <Skeleton loading={isLoading}>Create an event</Skeleton>
                  </Text>
                  <Skeleton loading={isLoading}>
                    <Text size="2" color="gray">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore
                    </Text>
                  </Skeleton>
                </Flex>
                <Skeleton loading={isLoading}>
                  <Flex gap="2" direction={"column"}>
                    <Text size="3">Event Name</Text>
                    <TextField.Root
                      name="eventName"
                      value={values.eventName}
                      className={
                        errors.eventName && submitCount > 0
                          ? isDark
                            ? "error-border-dark"
                            : "error-border"
                          : ""
                      }
                      onChange={handleChange}
                      placeholder="Your Event Name"
                      color="gray"
                      variant="soft"
                      size="2"
                      style={{
                        backgroundColor: isDark ? "#F4F5F312" : "#00200010",
                      }}
                    />
                  </Flex>
                </Skeleton>
                <Skeleton loading={isLoading}>
                  <Flex gap="2" direction="column">
                    <Text size="3">Date & Time</Text>
                    <Grid
                      columns={{ initial: "1", md: "2" }}
                      gap="3"
                      width="auto"
                    >
                      <Box className="react-datepicker-wrapper">
                        <DatePicker
                          className={`${
                            isDark ? "date-picker-dark" : "date-picker"
                          } ${
                            errors.date && submitCount > 0
                              ? isDark
                                ? "error-border-dark"
                                : "error-border"
                              : ""
                          }`}
                          selected={values.date}
                          onChange={(value) => setFieldValue("date", value)}
                          placeholderText="Select Date"
                        />
                      </Box>
                      <Select.Root
                        size="3"
                        name="timezone"
                        value={values.timezone}
                        onValueChange={(value) =>
                          setFieldValue("timezone", value)
                        }
                      >
                        <Select.Trigger
                          variant="soft"
                          color="gray"
                          className={
                            errors.timezone && submitCount > 0
                              ? isDark
                                ? "error-border-dark"
                                : "error-border"
                              : ""
                          }
                          style={{
                            backgroundColor: isDark ? "#F4F5F312" : "#00200010",
                          }}
                          placeholder={
                            (
                              <Flex align="center" gap="2">
                                <GlobeIcon height="16" width="16" />
                                <Text color="gray">Time Zone</Text>
                              </Flex>
                            ) as any
                          }
                        >
                          <Flex as="span" align="center" gap="2">
                            <GlobeIcon height="16" width="16" />
                            {values.timezone}
                          </Flex>
                        </Select.Trigger>
                        <Select.Content color="grass">
                          {TimeZone.map((tz, index) => (
                            <Select.Item key={index} value={tz.value}>
                              {tz.name}
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Root>
                      <Select.Root
                        size="3"
                        name="startTime"
                        value={values.startTime}
                        onValueChange={(value) =>
                          setFieldValue("startTime", value)
                        }
                      >
                        <Select.Trigger
                          variant="soft"
                          color="gray"
                          className={
                            errors.startTime && submitCount > 0
                              ? isDark
                                ? "error-border-dark"
                                : "error-border"
                              : ""
                          }
                          style={{
                            backgroundColor: isDark ? "#F4F5F312" : "#00200010",
                          }}
                          placeholder={
                            (
                              <Flex align="center" gap="2">
                                <ClockIcon height="16" width="16" />
                                <Text color="gray">Start time</Text>
                              </Flex>
                            ) as any
                          }
                        >
                          <Flex as="span" align="center" gap="2">
                            <ClockIcon height="16" width="16" />
                            {values.startTime}
                          </Flex>
                        </Select.Trigger>
                        <Select.Content color="grass">
                          {StartTime.map((tz, index) => (
                            <Select.Item key={index} value={tz.value}>
                              {tz.name}
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Root>
                      <Select.Root
                        size="3"
                        name="endTime"
                        value={values.endTime}
                        onValueChange={(value) =>
                          setFieldValue("endTime", value)
                        }
                      >
                        <Select.Trigger
                          variant="soft"
                          color="gray"
                          className={
                            errors.endTime && submitCount > 0
                              ? isDark
                                ? "error-border-dark"
                                : "error-border"
                              : ""
                          }
                          style={{
                            backgroundColor: isDark ? "#F4F5F312" : "#00200010",
                          }}
                          placeholder={
                            (
                              <Flex align="center" gap="2">
                                <ClockIcon height="16" width="16" />
                                <Text color="gray">End time</Text>
                              </Flex>
                            ) as any
                          }
                        >
                          <Flex as="span" align="center" gap="2">
                            <ClockIcon height="16" width="16" />
                            {values.endTime}
                          </Flex>
                        </Select.Trigger>
                        <Select.Content color="grass">
                          {EndTime.map((tz, index) => (
                            <Select.Item key={index} value={tz.value}>
                              {tz.name}
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Root>
                    </Grid>
                  </Flex>
                </Skeleton>

                <Skeleton loading={isLoading}>
                  <Flex gap="2" direction={"column"}>
                    <Text size="3">Description</Text>

                    <TextArea
                      placeholder="Add event description…"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      className={
                        errors.description && submitCount > 0
                          ? isDark
                            ? "error-border-dark"
                            : "error-border"
                          : ""
                      }
                      color="gray"
                      variant="soft"
                      style={{
                        backgroundColor: isDark ? "#F4F5F312" : "#00200010",
                      }}
                    />
                  </Flex>
                </Skeleton>

                <Flex gap="3" direction={"column"}>
                  <Skeleton loading={isLoading}>
                    <Flex gap="2" direction={"column"}>
                      <Text size="3">Video</Text>
                      <TextField.Root
                        placeholder="Add video link…"
                        name="video"
                        value={values.video}
                        onChange={handleChange}
                        className={
                          errors.video && submitCount > 0
                            ? isDark
                              ? "error-border-dark"
                              : "error-border"
                            : ""
                        }
                        color="gray"
                        variant="soft"
                        style={{
                          backgroundColor: isDark ? "#F4F5F312" : "#00200010",
                        }}
                      >
                        <TextField.Slot>
                          <Link2Icon height="16" width="16" />
                        </TextField.Slot>
                      </TextField.Root>
                    </Flex>
                  </Skeleton>
                  <Skeleton loading={isLoading}>
                    <Flex gap="2" direction={"column"}>
                      <Text size="3">Banner image</Text>
                      {typeof images !== "string" ? (
                        <Box id="imagePreview" className="image-preview ">
                          <Flex align="center" gap="5">
                            <Box
                              style={{
                                backgroundImage: `url(${images.url})`,
                                height: "120px",
                                width: "120px",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                              }}
                            />
                            <Flex direction="column" gap="2">
                              <Button
                                variant="soft"
                                color="red"
                                size="1"
                                style={{ width: "32px", height: "32px" }}
                                onClick={removeImage}
                              >
                                <TrashIcon />
                              </Button>
                              <Text size="1">{images.name}</Text>
                              <Text size="1">{images.size} MB</Text>
                            </Flex>
                          </Flex>
                        </Box>
                      ) : (
                        <Box
                          style={{
                            width: "100%",
                            backgroundColor: isDark ? "#F4F5F312" : "#00200010",
                            textAlign: "center",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                          className={
                            errors.bannerImage && submitCount > 0
                              ? isDark
                                ? "error-border-dark"
                                : "error-border"
                              : ""
                          }
                          p="5"
                        >
                          <input
                            ref={inputFile}
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              if (e.target.files && e.target.files.length) {
                                handleImageUpload(e.target.files[0]);
                                setFieldValue(
                                  "bannerImage",
                                  URL.createObjectURL(e.target.files[0])
                                );
                              }
                            }}
                            hidden
                          />
                          <Text
                            size="2"
                            style={{
                              color: isDark ? "#EBFDE766" : "#050F0078",
                            }}
                          >
                            <Text
                              color="gray"
                              onClick={onButtonClick}
                              style={{
                                textDecoration: "underline",
                                color: isDark ? "#EBFDE766" : "#050F0078",
                              }}
                            >
                              Click to upload
                            </Text>
                            &nbsp; or drag and drop<br></br> SVG, PNG, JPG or
                            GIF recommended size 1024x1024px
                          </Text>
                        </Box>
                      )}
                    </Flex>
                  </Skeleton>
                </Flex>

                <Flex gap="4" align="center">
                  <Skeleton loading={isLoading}>
                    <Button
                      disabled={isLoading}
                      type="submit"
                      size="3"
                      variant="soft"
                      color="lime"
                    >
                      <Spinner loading={isLoading}></Spinner>
                      Create event
                    </Button>
                    <AlertDialogModal
                      name="Cancel"
                      handleDelete={handleDelete}
                    />
                  </Skeleton>
                </Flex>
              </Flex>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default DashboardPageView;
