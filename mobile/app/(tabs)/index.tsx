import AffiliateServices from "@/components/AffiliateServices";
import PackagesList from "@/components/PackagesList";
import RechargeServices from "@/components/RechargeServices";
import ServicesList from "@/components/ServicesList";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

export default function Home() {
  return (
    <FlatList
      data={[]} // No data, just using header/footer
      ListEmptyComponent={() => (
        <>
          <ServicesList />
          <PackagesList />
          <AffiliateServices title="Travel and Accomodation" />
          <RechargeServices title="Recharge Services"/>
        </>
      )}
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
      renderItem={undefined} />
  );
}

const styles = StyleSheet.create({});