#!/bin/bash

echo "Welcome to the Bash!"
firstline=$(head -n1 source/changelog.md)
read -a splitfirstline <<< $firstline
version=${splitfirstline[1]}
echo "The version of Program is: $version"
echo "Do you want to conitnue? 1(Yes) 0(Not)"
read versioncontinue

if [ $versioncontinue -eq 1 ]
then
    for file in source/*
    do 
        if [ $file == "source/changelog.md" ]
        then
            echo "The file $file is not being to copy"
        else
            echo "The file $file is copying"
            cp -R $file build/
        fi    
    done
    cd build/
    firstline1=$(head -n1 secretinfo.md)
    read -a splitfirstline1 <<< $firstline1
    for letter in "${splitfirstline1[@]}"
    do
        if [ $letter == "42." ]
        then
            echo "The answer is XX." > secretinfo.md
        fi    
    done
    echo "The build version $version contains:"
    ls      
    cd ..
    zip -r build.zip build/*     
else
    echo "Please come back when you are ready"
fi

