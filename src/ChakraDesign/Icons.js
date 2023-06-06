import React from 'react'
import { Icon, Box, Text } from '@chakra-ui/react'

export default function Icons() {
    return (
        <Box>
            <Text fontSize="3xl">Icons</Text>
            <CalendarIcon />
            <AddTaskIcon />
            <ReportsIcon />
            <AddTaskIcon />
            <ReportsIcon />
            <AttachmentIcon />
            <AttachmentSlantIcon />
            <CarrotIcon />
            <LabelIcon />
            <KebabIcon />
            <MeatballIcon />
            <LoopIcon />
            <PencilIcon />
            <TemplateIcon />
            <TemplateNavIcon />
            <TrashIcon />
            <CopyIcon />
            <PlusIcon />
            <ProfileIcon />
            <TasksIcon />
            <SignOutIcon />
            <ActivityIcon />
            <DownloadIcon />
            <CloseIcon />
            <ClockIcon />
            <CircleCheckIcon />
            <FiltersIcon />
            <SearchIcon />
            <MyHubIcon />
            <EyeIcon />
            <InfoIcon />
            <WarningIcon />
            <PushPinIcon />
            <HourglassIcon />
            <MenuIcon />
            <LeftArrowIcon />
            <ListIcon />
            <RightArrowIcon />
        </Box>
    )
}

export const MyHubIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M14 13h-4c-.55 0-1 .45-1 1s.45 1 1 1h4c.55 0 1-.45 1-1s-.45-1-1-1m6 5.068c0 .238-.224.432-.5.432h-15c-.276 0-.5-.194-.5-.432V5.931c0-.238.224-.43.5-.43h4.126l2.6 3.177c.19.233.474.368.774.368h7.5c.276 0 .5.193.5.432v8.59zm-.5-11.022h-7.026L9.875 3.867c-.19-.233-.475-.367-.774-.367H4.5C3.122 3.5 2 4.59 2 5.931v12.137C2 19.41 3.122 20.5 4.5 20.5h15c1.378 0 2.5-1.09 2.5-2.432v-8.59c0-1.342-1.122-2.432-2.5-2.432z"
            />
        </Icon>
    )
}

export const FiltersIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M6 2c.553 0 1 .448 1 1v11.185c1.161.414 2 1.514 2 2.815 0 1.302-.839 2.402-2 2.816V21c0 .553-.447 1-1 1-.553 0-1-.447-1-1v-1.184C3.839 19.402 3 18.302 3 17c0-1.301.839-2.401 2-2.815V3c0-.552.447-1 1-1zm12 0c.553 0 1 .447 1 1v7.185c1.161.414 2 1.513 2 2.815s-.839 2.401-2 2.815V21c0 .553-.447 1-1 1-.553 0-1-.447-1-1v-5.185c-1.161-.414-2-1.513-2-2.815s.839-2.4 2-2.815V3c0-.553.447-1 1-1zm-6 0c1.654 0 3 1.346 3 3 0 1.302-.839 2.401-2 2.815V21c0 .553-.447 1-1 1-.553 0-1-.447-1-1V7.815C9.839 7.401 9 6.302 9 5c0-1.654 1.346-3 3-3z"
            />
        </Icon>
    )
}

export const SearchIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M5 11c0-3.309 2.691-6 6-6s6 2.691 6 6-2.691 6-6 6-6-2.691-6-6m15.707 8.293l-3.395-3.396C18.365 14.543 19 12.846 19 11c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8c1.846 0 3.543-.635 4.897-1.688l3.396 3.395c.195.195.451.293.707.293.256 0 .512-.098.707-.293.391-.391.391-1.023 0-1.414"
            />
        </Icon>
    )
}

export const AddTaskIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M15 11h-2V9c0-.55-.45-1-1-1s-1 .45-1 1v2H9c-.55 0-1 .45-1 1s.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1v-2h2c.55 0 1-.45 1-1s-.45-1-1-1m4 7c0 .551-.448 1-1 1H6c-.552 0-1-.449-1-1V6c0-.551.448-1 1-1h12c.552 0 1 .449 1 1v12zM18 3H6C4.346 3 3 4.346 3 6v12c0 1.654 1.346 3 3 3h12c1.654 0 3-1.346 3-3V6c0-1.654-1.346-3-3-3z"
            />
        </Icon>
    )
}

export const ReportsIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                id="htva6azf0a"
                d="M20.821 14.058c-.523-.186-1.093.087-1.276.609C18.417 17.857 15.385 20 12 20c-4.41 0-8-3.588-8-8 0-3.384 2.143-6.417 5.333-7.545.521-.183.794-.754.61-1.275-.184-.52-.755-.794-1.276-.61C4.68 3.98 2 7.77 2 12c0 5.514 4.486 10 10 10 4.231 0 8.02-2.678 9.43-6.667.184-.52-.088-1.091-.609-1.275M14 10V4.071c3.061.44 5.489 2.867 5.929 5.929H14zm-1-8c-.552 0-1 .447-1 1v8c0 .553.448 1 1 1h8c.552 0 1-.447 1-1 0-4.963-4.038-9-9-9z"
            />
        </Icon>
    )
}

export const CircleCheckIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 24 24">
            <path
                id="0t4ihsztaa"
                d="M11.971 2c.795.012 1.605.092 2.381.278.536.13.867.67.737 1.207-.129.536-.672.866-1.206.738-.621-.15-1.28-.213-1.906-.223-2.137.006-4.144.844-5.65 2.36C4.82 7.873 3.994 9.885 4 12.022c.006 2.137.844 4.143 2.359 5.65C7.869 19.174 9.871 20 12 20h.023c2.137-.006 4.144-.844 5.65-2.359 1.507-1.516 2.333-3.527 2.327-5.664-.001-.552.445-1.002.997-1.003.554 0 1.002.446 1.003.997.008 2.671-1.025 5.186-2.909 7.08-1.883 1.894-4.391 2.941-7.062 2.95H12c-2.661 0-5.164-1.033-7.051-2.91C3.055 17.208 2.008 14.701 2 12.03c-.008-2.672 1.025-5.186 2.909-7.08C6.792 3.055 9.3 2.01 11.971 2zm6.277 4.341c.364-.413.995-.457 1.411-.093.415.363.457.995.093 1.411l-7 8c-.182.208-.442.331-.719.341H12c-.265 0-.519-.105-.707-.293l-3-3c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l2.244 2.244z"
            />
        </Icon>
    )
}

export const AttachmentIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M10 18.333c-2.758 0-5-2.13-5-4.748V5.11c0-1.898 1.62-3.443 3.61-3.443 1.992 0 3.613 1.545 3.613 3.443l-.006 8.48c0 1.18-.997 2.138-2.222 2.138s-2.222-.959-2.222-2.138l.005-7.826c0-.46.374-.832.833-.832.46 0 .834.373.833.834L9.44 13.59c0 .259.248.47.555.47.307 0 .556-.211.556-.471l.005-8.48c0-.98-.873-1.777-1.945-1.777S6.667 4.13 6.667 5.11v8.475c0 1.7 1.495 3.082 3.333 3.082s3.333-1.383 3.333-3.082V5.11c0-.46.374-.833.834-.833.46 0 .833.372.833.833v8.475c0 2.617-2.242 4.748-5 4.748"
                transform="translate(-890 -318) translate(0 -3) translate(32 317) translate(858 4)"
            ></path>
        </Icon>
    )
}

export const AttachmentSlantIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M9.293 21c-1.655 0-3.23-.666-4.431-1.875-2.389-2.403-2.486-6.213-.22-8.494l7.386-7.43C12.798 2.427 13.835 2 14.95 2c1.194 0 2.328.479 3.192 1.349 1.721 1.731 1.788 4.482.146 6.132l-7.395 7.429c-.479.483-1.123.748-1.816.748-.73 0-1.423-.292-1.95-.821-1.053-1.061-1.085-2.752-.072-3.772L13.88 6.21c.39-.392 1.021-.394 1.413-.004.392.39.394 1.023.004 1.414l-6.825 6.856c-.24.242-.207.669.075.951.146.147.34.231.53.231.11 0 .268-.027.399-.158l7.394-7.429c.867-.873.802-2.358-.146-3.312-.906-.912-2.446-.984-3.277-.148l-7.386 7.43c-1.495 1.503-1.396 4.049.22 5.674C7.104 18.544 8.174 19 9.293 19c1 0 1.928-.378 2.61-1.064l7.387-7.43c.39-.391 1.023-.394 1.415-.004.39.39.393 1.022.003 1.414l-7.386 7.43C12.262 20.412 10.83 21 9.293 21"
                transform="translate(-880 -178) translate(32 174) translate(848 4)"
            ></path>
        </Icon>
    )
}

export const CarrotIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M12 16c-.228 0-.455-.077-.64-.232l-6-5c-.424-.353-.482-.984-.128-1.408.353-.424.983-.481 1.408-.128l5.371 4.476 5.362-4.315c.43-.346 1.06-.278 1.406.152.346.43.278 1.059-.152 1.406l-6 4.828c-.183.147-.405.221-.627.221"
            ></path>
        </Icon>
    )
}

export const LabelIcon = (props) => {
    return (
        <Icon w="24px" h="25px" {...props} viewBox="0 0 24 25">
            <path
                fill="currentColor"
                d="M10.56 8.44c.586.585.586 1.536 0 2.12-.585.586-1.535.586-2.12 0-.586-.585-.586-1.536 0-2.12.585-.586 1.535-.586 2.12 0m-4.726 4.452l6.032 6.033 7.058-7.058-6.032-6.033-7.785-.726.727 7.784zm6.032 8.107c-.465 0-.929-.177-1.284-.53L4.165 14.05c-.165-.164-.267-.382-.289-.614l-.872-9.344c-.027-.296.078-.59.289-.8.211-.211.503-.318.8-.288l9.344.872c.232.02.449.123.614.288l6.417 6.417c.343.343.532.799.532 1.285 0 .486-.189.942-.532 1.285l-7.317 7.316c-.354.354-.819.53-1.285.53z"
            ></path>
        </Icon>
    )
}

export const KebabIcon = (props) => {
    return (
        <Icon w="24px" h="25px" {...props} viewBox="0 0 24 25">
            <path
                fill="currentColor"
                d="M12 17c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0-7c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0-7c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2z"
                transform="translate(-1010 -318) translate(0 -3) translate(32 317) translate(978 4.333)"
            ></path>
        </Icon>
    )
}

export const MeatballIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 16 16">
            <path
                fill="currentColor"
                d="M8 6.667c.736 0 1.333.597 1.333 1.333S8.736 9.333 8 9.333 6.667 8.736 6.667 8 7.264 6.667 8 6.667zm4.667 0C13.403 6.667 14 7.264 14 8s-.597 1.333-1.333 1.333S11.333 8.736 11.333 8s.598-1.333 1.334-1.333zm-9.334 0c.736 0 1.334.597 1.334 1.333s-.598 1.333-1.334 1.333C2.597 9.333 2 8.736 2 8s.597-1.333 1.333-1.333z"
                transform="translate(-829.000000, -129.000000) translate(821.000000, 125.000000) translate(8.000000, 4.000000)"
            />
        </Icon>
    )
}

export const LoopIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M9.167.417c.46 0 .833.372.833.833 0 .46-.372.833-.833.833h-2.06c-.701 0-1.274.595-1.274 1.325v9.997l1.078-1.077c.326-.325.852-.325 1.178 0 .163.162.244.375.244.589 0 .213-.081.426-.244.589l-2.5 2.5c-.326.326-.852.326-1.178 0l-2.5-2.5c-.326-.325-.326-.853 0-1.178.326-.325.852-.325 1.178 0l1.078 1.077V3.408c0-1.649 1.319-2.991 2.94-2.991zM14.41.66c.326-.326.852-.326 1.178 0l2.5 2.5c.163.163.244.376.244.59 0 .213-.081.426-.244.588-.326.326-.852.326-1.178 0l-1.078-1.077v9.997c0 1.65-1.319 2.991-2.94 2.991h-2.06c-.46 0-.833-.372-.833-.833 0-.461.373-.833.833-.833h2.06c.702 0 1.274-.595 1.274-1.325V3.262l-1.078 1.077c-.326.326-.852.326-1.178 0-.326-.325-.326-.852 0-1.178z"
                transform="translate(-847 -85) translate(799) translate(24 72) translate(24 14.5) translate(0 1.667) rotate(-90 10 8.333)"
            ></path>
        </Icon>
    )
}

export const PencilIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 16 16">
            <path
                fill="currentColor"
                d="M10.68 7.12L8.881 5.321l1.3-1.299 1.795 1.796-1.298 1.3zm-4.627 4.63l-1.985.18.176-1.97L7.99 6.215l1.797 1.797-3.733 3.738zm6.883-6.858L11.11 3.065c-.494-.493-1.343-.516-1.81-.046L3.301 9.017c-.218.217-.352.505-.38.81l-.253 2.78c-.017.196.053.39.193.53.126.127.296.196.471.196.02 0 .04 0 .06-.003l2.78-.252c.306-.028.593-.162.81-.379l5.998-5.998c.485-.487.465-1.299-.045-1.81z"
                transform="translate(-966.000000, -275.000000) translate(640.000000, 157.000000) translate(218.247423, 110.000000) translate(108.000000, 8.000000)"
            />
        </Icon>
    )
}

export const TemplateIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M11.667 10.833h-.834V10c0-.46-.372-.833-.833-.833-.46 0-.833.373-.833.833v.833h-.834c-.46 0-.833.374-.833.834 0 .46.372.833.833.833h.834v.833c0 .46.372.834.833.834.46 0 .833-.374.833-.834V12.5h.834c.46 0 .833-.373.833-.833 0-.46-.373-.834-.833-.834m2.87 5.834H5.463c-.255 0-.463-.187-.463-.417V3.75c0-.23.208-.417.463-.417H10v2.625c0 1.31 1.014 2.375 2.262 2.375H15v7.917c0 .23-.207.417-.463.417zm-2.87-12.519l2.285 2.519h-1.69c-.328 0-.595-.318-.595-.709v-1.81zM16.45 6.94l-4.536-5c-.159-.174-.382-.273-.618-.273H5.463c-1.174 0-2.13.935-2.13 2.083v12.5c0 1.148.956 2.083 2.13 2.083h9.074c1.174 0 2.13-.935 2.13-2.083V7.5c0-.207-.078-.407-.217-.56z"
                transform="translate(-847 -230) translate(799 192.016) translate(24 24) translate(24 12) translate(0 2)"
            ></path>
        </Icon>
    )
}

export const TemplateNavIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 20 20">
            <path
                fill="currentColor"
                d="M11.667 10.833h-.834V10c0-.46-.372-.833-.833-.833-.46 0-.833.373-.833.833v.833h-.834c-.46 0-.833.374-.833.834 0 .46.372.833.833.833h.834v.833c0 .46.372.834.833.834.46 0 .833-.374.833-.834V12.5h.834c.46 0 .833-.373.833-.833 0-.46-.373-.834-.833-.834m2.87 5.834H5.463c-.255 0-.463-.187-.463-.417V3.75c0-.23.208-.417.463-.417H10v2.625c0 1.31 1.014 2.375 2.262 2.375H15v7.917c0 .23-.207.417-.463.417zm-2.87-12.519l2.285 2.519h-1.69c-.328 0-.595-.318-.595-.709v-1.81zM16.45 6.94l-4.536-5c-.159-.174-.382-.273-.618-.273H5.463c-1.174 0-2.13.935-2.13 2.083v12.5c0 1.148.956 2.083 2.13 2.083h9.074c1.174 0 2.13-.935 2.13-2.083V7.5c0-.207-.078-.407-.217-.56z"
                transform="translate(-847 -230) translate(799 192.016) translate(24 24) translate(24 12) translate(0 2)"
            ></path>
        </Icon>
    )
}

export const TrashIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="-2 -2 24 24">
            <path
                fill="currentColor"
                d="M7.5 9.167c.458 0 .833.375.833.833v3.333c0 .459-.375.834-.833.834-.458 0-.833-.375-.833-.834V10c0-.458.375-.833.833-.833zm5 0c.458 0 .833.375.833.833v3.333c0 .459-.375.834-.833.834-.458 0-.833-.375-.833-.834V10c0-.458.375-.833.833-.833zm2.5 6.666c0 .46-.373.834-.833.834H5.833c-.46 0-.833-.375-.833-.834V6.667h10v9.166zM8.333 3.607c0-.13.179-.274.417-.274h2.5c.238 0 .417.144.417.274V5H8.333V3.607zM17.5 5h-4.167V3.607c0-1.07-.934-1.94-2.083-1.94h-2.5c-1.15 0-2.083.87-2.083 1.94V5H2.5c-.458 0-.833.375-.833.833 0 .459.375.834.833.834h.833v9.166c0 1.379 1.122 2.5 2.5 2.5h8.334c1.378 0 2.5-1.121 2.5-2.5V6.667h.833c.458 0 .833-.375.833-.834 0-.458-.375-.833-.833-.833z"
                transform="translate(-847 -134) translate(799) translate(24 120) translate(24 12) translate(0 2)"
            />
        </Icon>
    )
}

export const CopyIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M7.5 10v.833H4.723c-.307 0-.556-.249-.556-.556V4.723c0-.307.249-.556.556-.556h5.554c.307 0 .556.249.556.556V7.5H10c-1.378 0-2.5 1.122-2.5 2.5M15 7.5h-2.5V4.723c0-1.226-.997-2.223-2.223-2.223H4.723C3.497 2.5 2.5 3.497 2.5 4.723v5.554c0 1.226.997 2.223 2.223 2.223H7.5V15c0 1.378 1.122 2.5 2.5 2.5h5c1.378 0 2.5-1.122 2.5-2.5v-5c0-1.378-1.122-2.5-2.5-2.5"
                transform="translate(-375 -155) translate(40) translate(325 145) translate(10 10)"
            />
        </Icon>
    )
}

export const PlusIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 20 20">
            <path
                fill="currentColor"
                d="M15.833 9.167h-5v-5c0-.461-.373-.834-.833-.834-.46 0-.833.373-.833.834v5h-5c-.46 0-.834.372-.834.833 0 .46.374.833.834.833h5v5c0 .461.373.834.833.834.46 0 .833-.373.833-.834v-5h5c.46 0 .834-.372.834-.833 0-.46-.374-.833-.834-.833"
                transform="translate(-1073 -27) translate(1063 17) translate(10 10)"
            />
        </Icon>
    )
}

export const ProfileIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 2 22 22">
            <path
                fill="currentColor"
                d="M19 20c0 .552-.447 1-1 1-.553 0-1-.448-1-1 0-2.757-2.243-5-5-5s-5 2.243-5 5c0 .552-.447 1-1 1-.553 0-1-.448-1-1 0-3.86 3.141-7 7-7s7 3.14 7 7M12 5c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2m0 6c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4"
            />{' '}
        </Icon>
    )
}

export const TasksIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                id="ducqtzlmga"
                d="M15.167 3c.552 0 1 .447 1 1 0 .553-.448 1-1 1H5.6c-.331 0-.6.27-.6.6v12.8c0 .33.269.6.6.6h12.8c.331 0 .6-.27.6-.6v-5.566c0-.553.448-1 1-1s1 .447 1 1V18.4c0 1.434-1.167 2.6-2.6 2.6H5.6C4.167 21 3 19.834 3 18.4V5.6C3 4.168 4.167 3 5.6 3zm3.115 3.304c.383-.396 1.016-.408 1.414-.022.397.383.407 1.016.023 1.413l-6.777 7c-.188.195-.447.306-.718.306-.276-.002-.536-.114-.724-.31l-2.223-2.33c-.382-.4-.366-1.034.033-1.415.4-.381 1.032-.365 1.414.034l1.505 1.577z"
            />
        </Icon>
    )
}
export const InfoIcon = (props) => {
    return (
        <Icon w="24px" h="24px" {...props} viewBox="0 0 24 24">
            <path
                fill="curentColor"
                d="M12 15c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm0-8c.552 0 1 .448 1 1v5c0 .552-.448 1-1 1s-1-.448-1-1V8c0-.552.448-1 1-1zm0 13c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m0-18C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2"
            />
        </Icon>
    )
}
export const WarningIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M12 15c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm0-7c.552 0 1 .448 1 1v4c0 .552-.448 1-1 1s-1-.448-1-1V9c0-.552.448-1 1-1zm8.865 10.353c-.23.405-.675.647-1.193.647H4.328c-.518 0-.964-.242-1.192-.647-.108-.19-.25-.577.017-1.017l7.67-12.718c.468-.774 1.886-.774 2.353 0l7.672 12.718c.266.44.125.827.017 1.017m1.696-2.05L14.889 3.584c-.6-.992-1.68-1.584-2.89-1.584-1.21 0-2.29.592-2.887 1.584L1.44 16.303c-.57.943-.586 2.077-.046 3.033C1.973 20.363 3.098 21 4.328 21h15.344c1.23 0 2.355-.637 2.935-1.664.54-.956.523-2.09-.046-3.033"
            />
        </Icon>
    )
}

export const SignOutIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M7 4c.55 0 1 .45 1 1s-.45 1-1 1H6v12h1c.55 0 1 .45 1 1s-.45 1-1 1H5c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1zm9.61 3.182c.452-.32 1.076-.21 1.394.243l2.814 4c.25.354.242.829-.018 1.175l-3 4c-.196.262-.497.4-.801.4-.208 0-.42-.065-.6-.2-.441-.331-.53-.958-.2-1.4l1.802-2.4H10c-.552 0-1-.447-1-1 0-.553.448-1 1-1h8c.03 0 .056.015.086.018l-1.718-2.443c-.318-.451-.21-1.075.243-1.393z"
            />{' '}
        </Icon>
    )
}

export const ActivityIcon = (props) => {
    return (
        <Icon w="24px" h="24px" {...props} viewBox="0 0 24 24">
            <path
                fill="currentColor"
                id="q9l8j61dua"
                d="M5.515 16l1.18-1.182c.378-.378.586-.88.586-1.414V8.727c0-1.357.59-2.654 1.62-3.556 1.038-.91 2.36-1.31 3.737-1.129 2.327.309 4.082 2.413 4.082 4.895v4.467c0 .534.208 1.036.585 1.413L18.485 16H5.516zM14 18.341C14 19.24 13.084 20 12 20s-2-.76-2-1.659V18h4v.341zm6.52-3.133l-1.8-1.804V8.937c0-3.481-2.502-6.438-5.82-6.877-1.922-.256-3.862.331-5.317 1.607C6.119 4.949 5.28 6.793 5.28 8.727l-.001 4.677-1.801 1.804c-.47.47-.608 1.169-.354 1.782.255.614.848 1.01 1.512 1.01H8v.341C8 20.359 9.794 22 12 22s4-1.641 4-3.659V18h3.363c.664 0 1.256-.396 1.51-1.009.255-.614.117-1.314-.352-1.783z"
            />
        </Icon>
    )
}

export const DownloadIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 20 20">
            <path
                fill="currentColor"
                d="M11.925 10.345l-1.092 1.042v-4.72c0-.46-.373-.834-.833-.834-.46 0-.834.374-.834.834v4.655L8.09 10.244c-.325-.326-.853-.326-1.179 0-.325.326-.325.853 0 1.179l2.5 2.499c.077.077.17.138.271.18.102.043.21.065.319.065.107 0 .214-.023.314-.064.05-.02.09-.056.135-.086.042-.028.089-.044.127-.08l2.5-2.386c.332-.318.345-.845.027-1.178-.318-.334-.845-.345-1.178-.028M10 16.667c-3.676 0-6.667-2.991-6.667-6.667 0-3.676 2.991-6.667 6.667-6.667 3.676 0 6.667 2.991 6.667 6.667 0 3.676-2.991 6.667-6.667 6.667m0-15c-4.595 0-8.333 3.738-8.333 8.333 0 4.595 3.738 8.333 8.333 8.333 4.595 0 8.333-3.738 8.333-8.333 0-4.595-3.738-8.333-8.333-8.333"
                transform="translate(-902 -114) translate(890 104) translate(12 10)"
            />
        </Icon>
    )
}

export const CloseIcon = (props) => {
    return (
        <Icon width="24px" height="24px" viewBox="0 0 24 24" {...props}>
            <path
                fill="currentColor"
                id="d0l4x0n45a"
                d="M13.414 12l4.293-4.293c.391-.391.391-1.023 0-1.414-.39-.391-1.023-.391-1.414 0L12 10.586 7.707 6.293c-.39-.391-1.023-.391-1.414 0-.39.391-.39 1.023 0 1.414L10.586 12l-4.293 4.293c-.39.391-.39 1.023 0 1.414.195.195.451.293.707.293.256 0 .512-.098.707-.293L12 13.414l4.293 4.293c.195.195.451.293.707.293.256 0 .512-.098.707-.293.391-.391.391-1.023 0-1.414L13.414 12z"
            />
        </Icon>
    )
}

export const EyeIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 20 20">
            <path
                d="M10 11.25c-.69 0-1.25-.56-1.25-1.25S9.31 8.75 10 8.75s1.25.56 1.25 1.25-.56 1.25-1.25 1.25m0-4.167A2.92 2.92 0 0 0 7.083 10 2.92 2.92 0 0 0 10 12.917 2.92 2.92 0 0 0 12.917 10 2.92 2.92 0 0 0 10 7.083m.183 7.082c-3.588.083-5.93-2.986-6.706-4.169.855-1.337 3.009-4.076 6.34-4.16 3.574-.091 5.929 2.985 6.705 4.168-.854 1.337-3.008 4.076-6.339 4.16m8.04-4.579c-.532-.926-3.468-5.571-8.448-5.415-4.607.116-7.286 4.175-7.998 5.415a.832.832 0 0 0 0 .83c.524.914 3.358 5.418 8.244 5.418.068 0 .136 0 .205-.002 4.605-.118 7.285-4.175 7.997-5.416a.836.836 0 0 0 0-.83"
                fill="currentColor"
            />
        </Icon>
    )
}
export const MenuIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M20.051 16c.522 0 .95.427.95.949v.102c0 .522-.428.949-.95.949H3.948C3.426 18 3 17.573 3 17.051v-.102c0-.522.426-.949.948-.949zm0-5c.522 0 .95.427.95.949v.102c0 .522-.428.949-.95.949H3.948C3.426 13 3 12.573 3 12.051v-.102c0-.522.426-.949.948-.949zm0-5c.522 0 .95.427.95.949v.102c0 .522-.428.949-.95.949H3.948C3.426 8 3 7.573 3 7.051v-.102C3 6.427 3.426 6 3.948 6z"
            />
        </Icon>
    )
}
export const CommunityIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 24 24">
            <path
                d="M22 19c0 .552-.447 1-1 1-.553 0-1-.448-1-1 0-1.654-1.346-3-3-3-.683 0-1.332.234-1.856.649.544.996.856 2.138.856 3.351 0 .552-.447 1-1 1-.553 0-1-.448-1-1 0-2.757-2.243-5-5-5s-5 2.243-5 5c0 .552-.447 1-1 1-.553 0-1-.448-1-1 0-3.86 3.141-7 7-7 1.927 0 3.673.783 4.94 2.046C14.809 14.374 15.879 14 17 14c2.757 0 5 2.243 5 5M17 9c.552 0 1 .449 1 1 0 .551-.448 1-1 1s-1-.449-1-1c0-.551.448-1 1-1m0 4c1.654 0 3-1.346 3-3s-1.346-3-3-3-3 1.346-3 3 1.346 3 3 3M9 5c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2m0 6c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4"
                fill="currentColor"
            />
        </Icon>
    )
}
export const PushPinIcon = (props) => {
    return (
        <Icon {...props} w="20px" h="20px" viewBox="0 -240 500 512">
            <path
                d="M306.5 186.6l-5.7-42.6H328c13.2 0 24-10.8 24-24V24c0-13.2-10.8-24-24-24H56C42.8 0 32 10.8 32 24v96c0 13.2 10.8 24 24 24h27.2l-5.7 42.6C29.6 219.4 0 270.7 0 328c0 13.2 10.8 24 24 24h144v104c0 .9.1 1.7.4 2.5l16 48c2.4 7.3 12.8 7.3 15.2 0l16-48c.3-.8.4-1.7.4-2.5V352h144c13.2 0 24-10.8 24-24 0-57.3-29.6-108.6-77.5-141.4zM50.5 304c8.3-38.5 35.6-70 71.5-87.8L138 96H80V48h224v48h-58l16 120.2c35.8 17.8 63.2 49.4 71.5 87.8z"
                fill="currentColor"
                transform="rotate(-45)"
            />
        </Icon>
    )
}

export const HourglassIcon = (props) => {
    return (
        <Icon {...props} w="20px" h="20px" viewBox="0 0 500 512">
            <path
                d="M368 48h4c6.627 0 12-5.373 12-12V12c0-6.627-5.373-12-12-12H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h4c0 80.564 32.188 165.807 97.18 208C47.899 298.381 16 383.9 16 464h-4c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h360c6.627 0 12-5.373 12-12v-24c0-6.627-5.373-12-12-12h-4c0-80.564-32.188-165.807-97.18-208C336.102 213.619 368 128.1 368 48zM64 48h256c0 101.62-57.307 184-128 184S64 149.621 64 48zm256 416H64c0-101.62 57.308-184 128-184s128 82.38 128 184z"
                fill="currentColor"
            />
        </Icon>
    )
}

export const LeftArrowIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 16 16">
            <path
                d="M9.22 12.667a.665.665 0 0 1-.52-.249l-3.22-4a.667.667 0 0 1 .008-.845l3.333-4a.668.668 0 0 1 1.024.854l-2.983 3.58 2.876 3.575a.666.666 0 0 1-.519 1.085"
                fill="currentColor"
            />
        </Icon>
    )
}
export const RightArrowIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M10 19c-.226 0-.454-.076-.64-.232-.425-.353-.481-.984-.128-1.408l4.476-5.371-4.316-5.362c-.345-.43-.277-1.06.152-1.406.431-.346 1.06-.278 1.407.152l4.829 6c.298.371.293.901-.011 1.267l-5 6c-.199.237-.482.36-.77.36"
            />
        </Icon>
    )
}
export const ClipboardIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M19 19c0 .552-.449 1-1 1H6c-.551 0-1-.448-1-1V8c0-.552.449-1 1-1v1c0 1.103.897 2 2 2h8c1.103 0 2-.897 2-2V7c.551 0 1 .448 1 1v11zM8 4l8 .003V8H8V4zm10 1V4c0-1.103-.897-2-2-2H8c-1.103 0-2 .897-2 2v1C4.346 5 3 6.346 3 8v11c0 1.654 1.346 3 3 3h12c1.654 0 3-1.346 3-3V8c0-1.654-1.346-3-3-3z"
            />
        </Icon>
    )
}

export const DragAndDropIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="-24 0 24 24">
            <path
                fill="currentColor"
                transform="rotate(90)"
                d="M7.4 12.2c.443-.33 1.069-.242 1.4.2.331.442.242 1.07-.2 1.4L7 15h13c.552 0 1 .447 1 1 0 .553-.448 1-1 1H6.918l1.558 1.21c.436.34.515.968.176 1.403-.197.254-.492.387-.79.387-.215 0-.431-.068-.613-.21l-3.862-3c-.247-.19-.389-.486-.387-.799.002-.31.15-.604.4-.79zm7.948-8.813c.339-.437.968-.516 1.403-.177l3.862 3c.247.191.389.486.387.8-.002.31-.15.603-.4.79l-4 3c-.18.135-.391.2-.599.2-.304 0-.605-.138-.801-.4-.331-.442-.242-1.069.2-1.4L17 8H4c-.552 0-1-.447-1-1 0-.553.448-1 1-1h13.082l-1.558-1.21c-.436-.339-.515-.968-.176-1.403z"
            />
        </Icon>
    )
}
export const NotesIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M6.103 15.873l2.977-.27 5.6-5.605L11.984 7.3l-5.617 5.617-.264 2.956zm7.22-9.911l2.696 2.694 1.947-1.95-2.694-2.694-1.948 1.95zm-9.03 11.724c-.21-.21-.315-.503-.29-.799l.38-4.17c.042-.457.244-.888.57-1.213l8.996-8.996c.702-.706 1.975-.67 2.716.068l2.738 2.738v.002c.766.766.797 1.984.069 2.714l-8.997 8.996c-.325.326-.756.527-1.214.57l-4.17.378c-.03.003-.06.003-.091.003-.263 0-.518-.104-.707-.291zM20 20.977c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1 0-.549.45-1 1-1h14c.55 0 1 .451 1 1z"
            />
        </Icon>
    )
}
export const CreditCardIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M11 13c.55 0 1 .45 1 1s-.45 1-1 1H7c-.55 0-1-.45-1-1s.45-1 1-1zm6 0c.55 0 1 .45 1 1s-.45 1-1 1h-2c-.55 0-1-.45-1-1s.45-1 1-1zm3 3c0 .551-.448 1-1 1H5c-.552 0-1-.449-1-1v-5h16v5zM4 8c0-.551.448-1 1-1h14c.552 0 1 .449 1 1v1H4V8zm15-3H5C3.346 5 2 6.346 2 8v8c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3V8c0-1.654-1.346-3-3-3z"
            />
        </Icon>
    )
}

export const HeartIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M7.22 6c-.864 0-1.674.334-2.28.941-1.258 1.26-1.258 3.311 0 4.573L12 18.585l7.06-7.071c1.259-1.262 1.259-3.313 0-4.573-1.212-1.215-3.348-1.213-4.56 0l-1.792 1.795c-.376.377-1.04.377-1.416 0L9.5 6.94C8.894 6.334 8.085 6 7.22 6M12 21c-.265 0-.52-.105-.707-.294l-7.768-7.78c-2.036-2.04-2.036-5.359 0-7.399C4.509 4.543 5.82 4 7.22 4s2.712.543 3.695 1.527L12 6.614l1.085-1.086C14.069 4.543 15.38 4 16.78 4c1.398 0 2.71.543 3.694 1.527 2.037 2.04 2.037 5.359 0 7.399l-7.767 7.781c-.188.188-.442.293-.708.293"
            />
        </Icon>
    )
}
export const HeartIconFilled = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M12 21c-.266 0-.52-.105-.708-.294l-7.767-7.78c-2.036-2.04-2.036-5.359 0-7.399C4.508 4.543 5.821 4 7.22 4s2.712.543 3.695 1.527L12 6.614l1.084-1.086C14.068 4.543 15.381 4 16.78 4s2.712.543 3.695 1.527c2.036 2.04 2.036 5.359.001 7.399l-7.768 7.781c-.188.188-.442.293-.708.293"
            />
        </Icon>
    )
}
export const CommentIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M12 10c.552 0 1 .447 1 1 0 .551-.448 1-1 1s-1-.449-1-1c0-.553.448-1 1-1zm4 0c.552 0 1 .447 1 1 0 .551-.448 1-1 1s-1-.449-1-1c0-.553.448-1 1-1zm-8 0c.552 0 1 .447 1 1 0 .551-.448 1-1 1s-1-.449-1-1c0-.553.448-1 1-1zM19.9 12.293c-.507 3.254-3.13 5.953-6.38 6.562-1.568.296-3.166.127-4.616-.487-.411-.174-.836-.262-1.253-.262-.19 0-.378.018-.563.055l-2.812.562.563-2.817c.118-.585.046-1.21-.207-1.81-.614-1.45-.782-3.047-.487-4.617.609-3.249 3.307-5.872 6.562-6.379 2.59-.403 5.123.413 6.95 2.241 1.83 1.83 2.647 4.363 2.243 6.952m-.827-8.366c-2.285-2.284-5.445-3.303-8.674-2.804-4.077.636-7.457 3.92-8.22 7.987-.368 1.958-.156 3.952.61 5.765.098.231.128.446.09.64l-.858 4.287c-.066.328.037.667.274.903.189.19.444.293.707.293.065 0 .13-.006.196-.019l4.283-.857c.246-.047.484.022.643.088 1.815.767 3.809.978 5.765.611 4.068-.763 7.352-4.143 7.988-8.22.502-3.227-.52-6.389-2.804-8.674"
            />
        </Icon>
    )
}
export const CommentFilledIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M16 13c-.552 0-1-.449-1-1 0-.553.448-1 1-1s1 .447 1 1c0 .551-.448 1-1 1m-4 0c-.552 0-1-.449-1-1 0-.553.448-1 1-1s1 .447 1 1c0 .551-.448 1-1 1m-4 0c-.552 0-1-.449-1-1 0-.553.448-1 1-1s1 .447 1 1c0 .551-.448 1-1 1m11.07-8.072c-2.283-2.284-5.444-3.303-8.673-2.804-4.077.636-7.457 3.92-8.22 7.987-.367 1.958-.156 3.952.61 5.765.099.23.129.446.09.64l-.857 4.287c-.066.328.037.667.273.903.189.19.444.293.707.293.065 0 .13-.006.196-.02l4.283-.856c.246-.047.485.022.644.088 1.814.767 3.808.977 5.765.611 4.067-.763 7.35-4.143 7.987-8.22.503-3.228-.52-6.389-2.804-8.674"
            />
        </Icon>
    )
}

export const DotsHorizontalIcon = (props) => {
    return (
        <Icon {...props} width="24px" height="24px" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M12 10c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm7 0c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zM5 10c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2z"
            />
        </Icon>
    )
}

export const ListIcon = (props) => {
    return (
        <Icon
            {...props}
            viewBox="0 0 20 20"
            fill="currentColor"
            fontSize="24px"
        >
            <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M6 4.75A.75.75 0 016.75 4h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 4.75zM6 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 10zm0 5.25a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75a.75.75 0 01-.75-.75zM1.99 4.75a1 1 0 011-1H3a1 1 0 011 1v.01a1 1 0 01-1 1h-.01a1 1 0 01-1-1v-.01zM1.99 15.25a1 1 0 011-1H3a1 1 0 011 1v.01a1 1 0 01-1 1h-.01a1 1 0 01-1-1v-.01zM1.99 10a1 1 0 011-1H3a1 1 0 011 1v.01a1 1 0 01-1 1h-.01a1 1 0 01-1-1V10z"
            />
        </Icon>
    )
}

export const SunIcon = (props) => {
    return (
        <Icon
            {...props}
            viewBox="0 0 20 20"
            fill="currentColor"
            fontSize="24px"
        >
            <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
        </Icon>
    )
}
export const CalendarIcon = (props) => {
    return (
        <Icon
            {...props}
            viewBox="0 0 20 20"
            fill="currentColor"
            fontSize="24px"
        >
            <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
            />
        </Icon>
    )
}
export const SnoozeIcon = (props) => {
    return (
        <Icon
            {...props}
            viewBox="0 0 20 20"
            fill="currentColor"
            fontSize="24px"
        >
            <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M4 8a6 6 0 1112 0c0 1.887.454 3.665 1.257 5.234a.75.75 0 01-.515 1.076 32.903 32.903 0 01-3.256.508 3.5 3.5 0 01-6.972 0 32.91 32.91 0 01-3.256-.508.75.75 0 01-.515-1.076A11.448 11.448 0 004 8zm6 7c-.655 0-1.305-.02-1.95-.057a2 2 0 003.9 0c-.645.038-1.295.057-1.95.057zM8.75 6a.75.75 0 000 1.5h1.043L8.14 9.814A.75.75 0 008.75 11h2.5a.75.75 0 000-1.5h-1.043l1.653-2.314A.75.75 0 0011.25 6h-2.5z"
            />
        </Icon>
    )
}

export const InboxIcon = (props) => {
    return (
        <Icon
            {...props}
            viewBox="0 0 20 20"
            fill="currentColor"
            fontSize="24px"
        >
            <path d="M10 2a.75.75 0 01.75.75v5.59l1.95-2.1a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0L6.2 7.26a.75.75 0 111.1-1.02l1.95 2.1V2.75A.75.75 0 0110 2z" />
            <path d="M5.273 4.5a1.25 1.25 0 00-1.205.918l-1.523 5.52c-.006.02-.01.041-.015.062H6a1 1 0 01.894.553l.448.894a1 1 0 00.894.553h3.438a1 1 0 00.86-.49l.606-1.02A1 1 0 0114 11h3.47a1.318 1.318 0 00-.015-.062l-1.523-5.52a1.25 1.25 0 00-1.205-.918h-.977a.75.75 0 010-1.5h.977a2.75 2.75 0 012.651 2.019l1.523 5.52c.066.239.099.485.099.732V15a2 2 0 01-2 2H3a2 2 0 01-2-2v-3.73c0-.246.033-.492.099-.73l1.523-5.521A2.75 2.75 0 015.273 3h.977a.75.75 0 010 1.5h-.977z" />
        </Icon>
    )
}

export const ClockIcon = (props) => {
    return (
        <Icon
            {...props}
            viewBox="0 0 20 20"
            fill="currentColor"
            fontSize="24px"
        >
            <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
            />
        </Icon>
    )
}

export const ExportToCalIcon = (props) => {
    return (
        <Icon
            {...props}
            viewBox="0 0 20 20"
            fill="currentColor"
            fontSize="24px"
        >
            <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
            />
            <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
            />
        </Icon>
    )
}
